import csv
import json
from io import StringIO

from pymatgen.core import Structure


def main():
    materials = []

    with open("public/materials/mp20_val.csv", "r") as f:
        reader = csv.DictReader(f)

        for row in reader:
            try:
                cif_string = row["cif"]

                # Use pymatgen to parse the CIF
                structure = Structure.from_str(cif_string, fmt="cif")

                # Extract atomic numbers and fractional coordinates
                atomic_numbers = [site.specie.Z for site in structure.sites]
                atomic_positions = [
                    site.frac_coords.tolist() for site in structure.sites
                ]

                # Extract lattice parameters
                lattice = structure.lattice
                lattice_parameters = {
                    "a": lattice.a,
                    "b": lattice.b,
                    "c": lattice.c,
                    "alpha": lattice.alpha,
                    "beta": lattice.beta,
                    "gamma": lattice.gamma,
                }

                material = {
                    "material_id": row["material_id"],
                    "formation_energy_per_atom": float(
                        row["formation_energy_per_atom"]
                    ),
                    "band_gap": float(row["band_gap"]),
                    "pretty_formula": row["pretty_formula"],
                    "e_above_hull": float(row["e_above_hull"]),
                    "lattice_parameters": lattice_parameters,
                    "atomic_numbers": atomic_numbers,
                    "atomic_positions": atomic_positions,
                    "forces": [],  # Placeholder for forces, as it's not in the CSV
                }
                materials.append(material)

            except Exception as e:
                print(f"Error processing material {row['material_id']}: {e}")
                continue

    with open("public/materials/mp20_val.json", "w") as f:
        json.dump(materials, f)

    print(f"Converted {len(materials)} materials to mp20_val.json")
    if materials:
        print(f"First material has {len(materials[0]['atomic_positions'])} atoms")
        print(f"Sample atomic numbers: {materials[0]['atomic_numbers'][:5]}")
        print(f"Sample atomic positions: {materials[0]['atomic_positions'][:3]}")


if __name__ == "__main__":
    main()
