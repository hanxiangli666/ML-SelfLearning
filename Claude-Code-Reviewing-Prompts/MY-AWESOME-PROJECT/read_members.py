import csv
from pathlib import Path

csv_path = Path(__file__).parent / "members.csv"
with open(csv_path, newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    print(f"{'First Name':<20} {'Last Name':<20}")
    print("-" * 40)
    for row in reader:
        print(f"{row['first_name']:<20} {row['last_name']:<20}")
