/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    fontSize: {
      xsm: ["9px", "12.28px"],
      sm: ["10px", "13.64px"],
      av: ["12px", "16.37px"],
      md: ["14px", "19.1px"],
      base: ["16px", "21.82px"],
      lg: ["18px", "24.55px"],
      xl: ["20px", "27.28px"],
      "2xl": ["24px", "32.74px"],
      "3xl": ["30px", "40.92px"],
      "3.5xl": ["38px", "51.83px"],
      "4xl": ["44px", "51.66px"],
    },

    extend: {
      fontFamily: {
        nunito: ["Nunito Sans", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
      },
      colors: {
        primary: {
          strong_gray: "#000000",
          medium_gray: "#171717",
          normal_gray: "#4A4A4A",
          white: "#FFFFFF",
          gray_white: "rgba(255, 255, 255, 1)",
          anchor: "#1493E8",
        },
        secondary: {
          userPage_bg: "#F9F9F9",
          nav_inactive_color: "#737373",
          label_border: "#D9D9D9",
        },
        background: {
          light_brown: "#FFF4F5",
          lightest_pink: "#FFDAB9",
          light_pink: "#FFB6C1",
          light_gray: "#FDFDFD",
        },
        pink: {
          start: "#D80765",
          end: "#EF233C",
        },
      },
      backgroundImage: {
        "footer-texture": "url('/Images/LandingPage/other/bgImage.png')",
      },
      boxShadow: {
        "3xl": "0px 2px 8px 0px rgba(0, 0, 0, 0.08)",
        "2xl": "0px 4px 8px 0px #00000040",
      },
      screens: {
        "2.5xl": "1680px",
        "3xl": "1720px",
        "2xl": "93rem",
      },
      keyframes: {
        expandHeight: {
          "0%": {
            height: "0%",
          },

          "100%": {
            height: "100%",
          },
        },
      },
      animation: {
        expand: "expandHeight 0.3s",
      },
    },
    plugins: ["prettier-plugin-tailwindcss"],
  },
};
