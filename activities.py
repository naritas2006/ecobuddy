# EcoBuddy Activity Lookup Table
# Each activity maps to automatic points and carbon offset values.
# Sources mentioned below for transparency.

ACTIVITY_TABLE = {
    "Plant a Tree": {
        "points": 50,
        "carbon_offset": 22,  
        # Source: EPA — One mature tree absorbs ~22 kg CO₂ per year
        # https://www.epa.gov/energy/greenhouse-gases-equivalencies-calculator
    },
    "Recycle 1 kg of Paper": {
        "points": 20,
        "carbon_offset": 1.3,  
        # Source: US EPA — Recycling 1 ton of paper saves ~1.3 tons CO₂e.
        # So ~1.3 kg CO₂ saved per kg paper.
    },
    "Recycle Plastic Bottle": {
        "points": 5,
        "carbon_offset": 0.1,  
        # Source: Waste Management & EPA studies.
    },
    "Use Public Transport (per km)": {
        "points": 2,
        "carbon_offset_per_km": 0.18,  
        # Source: Our World in Data — Car emits ~0.21 kg CO₂/km, 
        # Bus/train ~0.03 kg/km → net saving ~0.18 kg/km.
    },
    "Cycle to Work (per km)": {
        "points": 5,
        "carbon_offset_per_km": 0.21,  
        # Source: EPA — Car emits ~0.21 kg CO₂/km → cycling saves all of it.
    },
    "Walk Instead of Driving (per km)": {
        "points": 6,
        "carbon_offset_per_km": 0.21,  
        # Same as cycling, but slightly higher points for effort.
    },
    "Switch to LED Bulbs (per bulb)": {
        "points": 15,
        "carbon_offset": 0.5,  
        # Source: EnergyStar — LEDs save ~0.5 kg CO₂ per bulb per year.
    },
    "Avoid Single-use Plastic (per item)": {
        "points": 3,
        "carbon_offset": 0.05,  
        # Conservative estimate based on lifecycle emissions.
    },
    "Compost Organic Waste (per kg)": {
        "points": 10,
        "carbon_offset": 0.25,  
        # Source: EPA Food Waste study — ~0.25 kg CO₂e saved per kg composted.
    },
    "Meat-free Meal": {
        "points": 8,
        "carbon_offset": 2.5,  
        # Source: Oxford Study — skipping 1 beef meal saves ~2.5 kg CO₂e.
    },
    "Solar Panel Installed (per kWh/year)": {
        "points": 100,
        "carbon_offset": 0.7,  
        # Source: NREL — solar displaces ~0.7 kg CO₂ per kWh generated.
    }
}
