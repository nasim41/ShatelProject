/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    screens: {
      'xxxsm': '380px',
      'xxsm': '450px',
      'xsm': '550px' ,
      ...defaultTheme.screens
  },
  extend: {
    colors: {
      backgroundMigMig: {
        90: 'rgba(122, 25,151, 1)',
        100: 'rgba(147, 68, 151, 1)'
      },
      backgroundTools: {
        90: 'rgba(56, 51, 47, 1)',
        100: 'rgba(77, 77, 77, 1)'
      },
      backgroundAnalysis: {
        90: 'rgba(47, 32, 141, 1)' ,
        100: 'rgba(42, 107, 141, 1)'
      },
      backgroundPlatform: {
        90: 'rgba(20, 123, 65, 1)',
        100: 'rgba(17, 178, 65, 1)'
      },
      backgroundHeaderDark: {
        100: 'rgba(11, 35, 62, 0.9)'
      },
      backgroundHeader: {
        100: 'rgba(255, 255, 255, 0.93)'
      },
      backgroundLight: {
        100: 'rgba(249,249,249, 1)'
      },
      bgIconFooterDark: {
        100: 'rgba(52, 54, 55, 1)'
      },
      backgroundFooter: {
        100: 'rgba(242, 242, 242, 1)'
      },
      backgroundFooterDark: {
        100: 'rgba(58, 58, 58, 1)'
      },
      backgroundAboutHeader: {
        100: 'rgba(0, 0, 0 , 0.9)'
      },
      buttonDark: {
        100: 'rgba(65, 64, 66, 1)'
      },
      primary: {
        10:'rgba(255, 194, 14 , 0.1)',
        20:'rgba(255, 194, 14 , 0.2)',
        30:'rgba(255, 194, 14 , 0.3)',
        50: 'rgba(255, 194, 14 , 0.5)',
        80: 'rgba(255, 194, 14 , 0.8)',
        100: 'rgba(255, 194, 14, 1)' ,
      },
      black:{
        80: 'rgba(0, 0, 0, 0.8)',
      } ,
      migMig: {
        50: 'rgba(184, 61, 214, 0.5)',
        100: 'rgba(184, 61, 214, 1)'
      },
      white: {
        50: 'rgba(252, 255, 255, 0.8)',
        100: 'rgba(252, 255, 255, 1)'
      },
      background: {
        100: 'rgba(243, 244, 246, 1)'
      },
      modalBackground: {
        100: 'rgb(30, 41, 59 ,0.7)'
      },
      loadingDark: {
        100: 'rgb(51, 65, 85 , 0.7)'
      },
      backgroundInput: {
        100: 'rgba(236, 240, 241, 1)'
      },
    },
    width : {
      'auto' : 'auto',
      'fit': 'fit-content',
      'max' : 'max-content',
      'full-260' : 'calc(100% - 260px )' ,
      'full-78' : 'calc(100% - 78px )' ,
    },
    height: {
      'auto' : 'auto',
      'fit': 'fit-content',
    },
    zIndex: {
      'auto' : 'auto' ,
      '60': '60' ,
      '70': '70' ,
      '80' : '80' , 
      '90' : '90' ,
    },
    fontFamily: {
      dana: ['dana'],
      vazir : ["Vazirmatn"]
    },
    keyframes: {
      'fade-in' : {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' }
      },
      'zoomIn' : {
        '0%' :  {
        opacity: '0' ,
        transform: 'scale3d(.3, .3, .3)' ,
        },
        '50%' : {
          opacity: '1'
        }
      },
      'toLeft' : {
        '0%' :  {
        opacity: '0' ,
        transform: 'translateX(40px)' ,
        },
        '25%' : {
          opacity: '0.25' ,
          transform: 'translateX(30px)' , 
        },
        '50%' : {
          opacity: '0.5' ,
          transform: 'translateX(20px)' ,
        },
        '75%' : {
          opacity: '0.75' ,
          transform: 'translateX(10px)' ,
        },
        '100%' : {
          opacity: '1' ,
          transform: 'translateX(0px)' ,
        }
      },
      'toRight' : {
        '0%' :  {
        opacity: '0' ,
        transform: 'translateX(-40px)' ,
        },
        '25%' : {
          opacity: '0.25' ,
          transform: 'translateX(-30px)' , 
        },
        '50%' : {
          opacity: '0.5' ,
          transform: 'translateX(-20px)' ,
        },
        '75%' : {
          opacity: '0.75' ,
          transform: 'translateX(-10px)' ,
        },
        '100%' : {
          opacity: '1' ,
          transform: 'translateX(0px)' ,
        }
      },
      'toDown' : {
        '0%' :  {
        opacity: '0' ,
        transform: 'translateY(-40px)' ,
        },
        '25%' : {
          opacity: '0.25' ,
          transform: 'translateY(-30px)' , 
        },
        '50%' : {
          opacity: '0.5' ,
          transform: 'translateY(-20px)' ,
        },
        '75%' : {
          opacity: '0.75' ,
          transform: 'translateY(-10px)' ,
        },
        '100%' : {
          opacity: '1' ,
          transform: 'translateY(0px)' ,
        }
      },
      'toUp' : {
        '0%' :  {
        opacity: '0' ,
        transform: 'translateY(40px)' ,
        },
        '25%' : {
          opacity: '0.25' ,
          transform: 'translateY(20px)' , 
        },
        '50%' : {
          opacity: '0.5' ,
          transform: 'translateY(10px)' ,
        },
        '75%' : {
          opacity: '0.75' ,
          transform: 'translateY(0px)' ,
        },
        '100%' : {
          opacity: '1' ,
        }
      }
    },
    
    animation: {
      'fade-in': 'fade-in 0.3s ease-in' ,
      'zoom-in' : 'zoomIn 0.3s ease-in' ,
      'my-fade-left' : 'toLeft 0.8s linear' ,
      'my-fade-right' : 'toRight 0.8s linear' ,
      'my-fade-down' : 'toDown 0.8s linear' ,
      'my-fade-up' : 'toUp 0.8s linear' ,
      'my-fade-left-fast' : 'toLeft 0.3s linear' ,

    },
    boxShadow: {
      'yellow': 'rgba(254, 240, 138, 1.32) 0px 2px 4px 0px, rgba(254, 240, 138, 2.12) 0px 2px 16px 0px',
      'purple': 'rgba(180, 58, 212, 1.32) 0px 2px 4px 0px, rgba(180, 58, 212, 2.12) 0px 2px 16px 0px',
      'white': 'rgba(255, 255, 255, 1.32) 0px 2px 4px 0px, rgba(255, 255, 255, 2.12) 0px 2px 16px 0px',

    },
  },
  },
  plugins: [],
}
