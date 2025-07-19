import csv
import json


def parse_cif(cif_string: str) -> tuple[dict, list[dict]]:
    """
    Parses a CIF string to extract lattice parameters, atomic symbols, and coordinates.
    """
    lines = cif_string.strip().split("\n")

    lattice = {}
    atoms = []

    in_atom_loop = False
    atom_headers = []

    for line in lines:
        line = line.strip()

        # Parse lattice parameters
        if line.startswith("_cell_length_a"):
            lattice["a"] = float(line.split()[1])
        elif line.startswith("_cell_length_b"):
            lattice["b"] = float(line.split()[1])
        elif line.startswith("_cell_length_c"):
            lattice["c"] = float(line.split()[1])
        elif line.startswith("_cell_angle_alpha"):
            lattice["alpha"] = float(line.split()[1])
        elif line.startswith("_cell_angle_beta"):
            lattice["beta"] = float(line.split()[1])
        elif line.startswith("_cell_angle_gamma"):
            lattice["gamma"] = float(line.split()[1])

        # Detect start of atom site loop
        elif line == "loop_" and not in_atom_loop:
            # Check if next lines contain atom site headers
            continue
        elif line.startswith("_atom_site_"):
            if not in_atom_loop:
                in_atom_loop = True
                atom_headers = []
            atom_headers.append(line)
        elif in_atom_loop and (line.startswith("_") or line == ""):
            # End of atom site data or other metadata
            if not line.startswith("_atom_site_"):
                in_atom_loop = False
        elif in_atom_loop and line and not line.startswith("_"):
            # This is atom data
            parts = line.split()
            if len(parts) >= len(atom_headers):
                # Find indices for symbol and coordinates
                symbol_idx = None
                x_idx = None
                y_idx = None
                z_idx = None

                for i, header in enumerate(atom_headers):
                    if "_atom_site_type_symbol" in header:
                        symbol_idx = i
                    elif "_atom_site_fract_x" in header:
                        x_idx = i
                    elif "_atom_site_fract_y" in header:
                        y_idx = i
                    elif "_atom_site_fract_z" in header:
                        z_idx = i

                if all(idx is not None for idx in [symbol_idx, x_idx, y_idx, z_idx]):
                    try:
                        # Type check: all indices are guaranteed to be not None at this point
                        assert symbol_idx is not None
                        assert x_idx is not None
                        assert y_idx is not None
                        assert z_idx is not None

                        symbol = parts[symbol_idx]
                        x = float(parts[x_idx])
                        y = float(parts[y_idx])
                        z = float(parts[z_idx])
                        atoms.append({"symbol": symbol, "x": x, "y": y, "z": z})
                    except (ValueError, IndexError):
                        pass  # Skip malformed lines

    return lattice, atoms


def main():
    materials = []

    with open("public/materials/mp20_val.csv", "r") as f:
        reader = csv.DictReader(f)

        for row in reader:
            cif_string = row["cif"]
            lattice, atoms = parse_cif(cif_string)

            atomic_numbers = [atom["symbol"] for atom in atoms]
            atomic_positions = [[atom["x"], atom["y"], atom["z"]] for atom in atoms]

            material = {
                "material_id": row["material_id"],
                "formation_energy_per_atom": float(row["formation_energy_per_atom"]),
                "band_gap": float(row["band_gap"]),
                "pretty_formula": row["pretty_formula"],
                "e_above_hull": float(row["e_above_hull"]),
                "lattice_parameters": lattice,
                "atomic_numbers": atomic_numbers,
                "atomic_positions": atomic_positions,
                "forces": [],  # Placeholder for forces, as it's not in the CSV
            }
            materials.append(material)

    with open("public/materials/mp20.json", "w") as f:
        json.dump(materials, f)

    print(f"Converted {len(materials)} materials to mp20.json")
    if materials:
        print(f"First material has {len(materials[0]['atomic_positions'])} atoms")
        print(f"Sample atomic positions: {materials[0]['atomic_positions'][:3]}")


if __name__ == "__main__":
    main()
