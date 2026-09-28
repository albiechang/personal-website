const entries = [
  {
    order: 2,
    label: "Current entry placeholder",
    marker: null,
    company: "Organization name pending confirmation",
    role: "Role pending confirmation",
    location: "Location pending confirmation",
    startDate: "Start date pending confirmation",
    currentLabel: "Current status pending confirmation"
  },
  {
    order: 1,
    label: "Earlier entry placeholder",
    marker: null,
    company: "Organization name pending confirmation",
    role: "Role pending confirmation",
    location: "Location pending confirmation",
    startDate: "Start date pending confirmation",
    endDate: "End date pending confirmation"
  }
];

module.exports = entries.sort((left, right) => right.order - left.order);
