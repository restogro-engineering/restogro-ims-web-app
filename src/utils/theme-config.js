export const Theme = {
  typography: {
    fontFamily: ["ProximaNovaAltLight-Regular"],
  },
  palette: {
    primary: {
      main: "#1756f3",
    },
    secondary: {
      main: "#051d5b",
    },
    light: {
      main: "white",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        color: "#1756f3",
      },
      containedPrimary: {
        color: "#1756f3",
      },
      outlinedPrimary: {
        color: "#1756f3",
        border: "#1756f3",
      },
      text: {
        color: "#051d5b",
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 30,
      },
    },
    MuiTypography: {
      colorTextSecondary: {
        color: "#fff",
      },
    },
  },
};
export const unprotected_route_theme = {
  typography: {
    fontFamily: ["ProximaNovaAltLight-Regular"],
  },
  palette: {
    primary: {
      main: "#051d5b",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 0,
      },
      containedPrimary: {
        color: "#fff",
      },
      text: {
        color: "#051d5b",
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 30,
      },
    },
    MuiTypography: {
      colorTextSecondary: {
        color: "#fff",
      },
    },
  },
};
