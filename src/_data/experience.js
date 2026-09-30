const entries = [
  {
    order: 6,
    marker: null,
    company: "VDE Americas",
    role: "Performance Engineer",
    location: "Remote",
    startDate: "May 2024",
    currentLabel: "Present"
  },
  {
    order: 5,
    marker: null,
    company: "Smartville",
    role: "Manufacturing Engineer",
    location: "Carlsbad, CA",
    startDate: "June 2023",
    endDate: "June 2024"
  },
  {
    order: 4,
    marker: null,
    company: "Global TIES",
    role: "Instructional Assistant",
    location: "La Jolla, CA",
    startDate: "September 2022",
    endDate: "June 2024"
  },
  {
    order: 3,
    marker: null,
    company: "National Renewable Energy Laboratory",
    role: "Mechanical Engineering Intern",
    location: "Golden, CO",
    startDate: "June 2022",
    endDate: "August 2022"
  },
  {
    order: 2,
    marker: null,
    company: "UCSD Bookstore",
    role: "Computer Repair Technician",
    location: "La Jolla, CA",
    startDate: "September 2021",
    endDate: "June 2024"
  },
  {
    order: 1,
    marker: null,
    company: "MSi",
    role: "RMA Technician",
    location: "City of Industry, CA",
    startDate: "November 2020",
    endDate: "September 2021"
  }
];

module.exports = entries.sort((left, right) => right.order - left.order);
