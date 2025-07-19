import json
import re

import pandas as pd


def parse_cif(cif_string):
    """
    Parses a CIF string to extract lattice parameters, atomic symbols, and coordinates.
    """
    lines = cif_string.strip().split("\n")

    lattice = {}
    atoms = []

    # Regex patterns
    lattice_param_pattern = re.compile(r"_cell_length_a\s+([\d.]+)")
    lattice_angle_pattern = re.compile(r"_cell_angle_alpha\s+([\d.]+)")
    atom_site_pattern = re.compile(r"(\w+)\s+[\d.]+\s+[\d.]+\s+[\d.]+")

    in_atom_loop = False
    for line in lines:
        if line.strip() == "loop_":
            in_atom_loop = True
            continue

        if "loop_" in line and "_atom_site_fract_x" in line:
            in_atom_loop = True
            continue

        if in_atom_loop and line.startswith("_"):
            # This is not a data line
            continue

        if in_atom_loop and not line.strip():
            in_atom_loop = False
            continue

        if not in_atom_loop:
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
        else:
            parts = line.split()
            if len(parts) >= 4:
                symbol = parts[0]
                try:
                    x, y, z = map(float, parts[1:4])
                    atoms.append({"symbol": symbol, "x": x, "y": y, "z": z})
                except (ValueError, IndexError):
                    pass  # Ignore lines that cannot be parsed as atom data

    return lattice, atoms


def main():
    df = pd.read_csv("public/materials/mp20_train.csv")

    materials = []
    for _, row in df.iterrows():
        cif_string = row["cif"]
        lattice, atoms = parse_cif(cif_string)

        atomic_numbers = [atom["symbol"] for atom in atoms]
        atomic_positions = [[atom["x"], atom["y"], atom["z"]] for atom in atoms]

        material = {
            "material_id": row["material_id"],
            "formation_energy_per_atom": row["formation_energy_per_atom"],
            "band_gap": row["band_gap"],
            "pretty_formula": row["pretty_formula"],
            "e_above_hull": row["e_above_hull"],
            "lattice_parameters": lattice,
            "atomic_numbers": atomic_numbers,
            "atomic_positions": atomic_positions,
            "forces": [],  # Placeholder for forces, as it's not in the CSV
        }
        materials.append(material)

    with open("public/materials/mp20.json", "w") as f:
        json.dump(materials, f)


if __name__ == "__main__":
    main()
