import { makeStyles } from "@material-ui/core/styles";

const LoginStyles = makeStyles(theme => ({
  root: {
    // margin: theme.spacing(1),
    fontFamily: "workSans",
    color: "white",
    backgroundColor: "#505050",
    position:'relative',
    // margin: "0 auto",
    width: "100%",
    // height:'812px',
    // minHeight: "100vh"
  },
  onboardingNav: {
    color: 'white',
    display: 'flex',
    width: '95%',
    margin: '0 auto',
    justifyContent: 'flex-end',
    padding: '1.1% 1%',
  },
  boxContainer: {
    display: "flex",
    justifyContent: "spaceBetween",
    margin: "0 auto",
    width: "85%"
  },
  boxLeft: {
    width: "45%",
    margin: "0 1%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "left",
    maxWidth: "100%",
    boxSizing: "border-box",
    textContainer: {
      whiteSpace: "nowrap",
      h1: {
        fontSize: "5vw"
      },
      h5: {
        fontSize: "1.5vw",
        fontWeight: "normal",
        paddingTop: "2rem"
      }
    },
    imageWrapper: {
      width: "75%",
      padding: "5% 0",
      logo: {
        width: "100%"
      }
    },
    BoxRight: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 'auto',
        padding: '3%',
        borderRadius: '4px',
        background: 'white',
        width: '100%',
        maxWidth: '518px',
        height: '550px',
    
        form:{
          margin: 'auto',
          padding: '3% 0',
          maxWidth: '320px',
          width: '100%',
          color: '$black',
        },
    
//         formControl: {
//           border-radius: 4px;
//           border: 1px solid #D8D8D8;
//           max-width: 320px;
//           width: 100%;
//           height: auto;
//           padding: 2.7% 1.7%;
//           margin: 2.6% auto;
//           margin-bottom: 1rem;
//         }
//         input::placeholder {
//           font-size: 1.1rem;
//           color:#D8D8D8;
//         }
    
//         bottom-form: {
//           width: 100%;
//           display: flex;
//           justify-content: space-between;
//           margin: 3% 0;
        
//         checkboxContainer {
//            display: flex;
//            flex-direction: row;
//            padding-top: 13px;
//            align-items: center;
//             p {
//               color:black;
//               white-space: nowrap;
//             }
//           }.box-right {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     margin: auto;
//     padding: 3%;
//     border-radius: 4px;
//     background: white;
//     width: 100%;
//     max-width: 518px;
//     height: 550px;

//     .form {
//       margin: auto;
//       padding: 3% 0;
//       max-width: 320px;
//       width: 100%;
//       color: $black;
//     }

//     .form-control {
//       border-radius: 4px;
//       border: 1px solid #D8D8D8;
//       max-width: 320px;
//       width: 100%;
//       height: auto;
//       padding: 2.7% 1.7%;
//       margin: 2.6% auto;
//       margin-bottom: 1rem;
//     }
//     input::placeholder {
//       font-size: 1.1rem;
//       color:#D8D8D8;
//     }

//     .bottom-form {
//       width: 100%;
//       display: flex;
//       justify-content: space-between;
//       margin: 3% 0;
    
//       .check-box-container {
//        display: flex;
//        flex-direction: row;
//        padding-top: 13px;
//        align-items: center;
//         p {
//           color:black;
//           white-space: nowrap;
//         }
//       }

//       .btn-container {
//         width: 60%;
//         display: flex;
//         justify-content: flex-end;
//         padding-bottom: 15px;
        
//         .signup-btn,
//         button.login-btn {
//           align-self: end;
//           border: none;
//           width: 100%;
//           max-width: 115px;
//           height: 36px;
//           border-radius: 4px;
//           background: #00E6BC;
//           color: black;
//           font-size: 14px;
//         }
//       }
//     }
//     .bottomAccount{
//       display: flex;
//       flex-direction: column;
//       padding: 30px;
      
//       .loginAccount {
//         text-align: center;
//         color: #2477E5;
//         font-size: 18px;
//       }
//     }
//     .callingError {
//       color: red;
//       display: flex;
//       justify-content: center;
//     }
//   }
    
//           btnContainer {
//             width: 60%;
//             display: flex;
//             justify-content: flex-end;
//             padding-bottom: 15px;
            
//             .signup-btn,
//             button.login-btn {
//               align-self: end;
//               border: none;
//               width: 100%;
//               max-width: 115px;
//               height: 36px;
//               border-radius: 4px;
//               background: #00E6BC;
//               color: black;
//               font-size: 14px;
//             }
//           }
//         }
//         .bottomAccount{
//           display: flex;
//           flex-direction: column;
//           padding: 30px;
          
//           .loginAccount {
//             text-align: center;
//             color: #2477E5;
//             font-size: 18px;
//           }
//         }
//         .callingError {
//           color: red;
//           display: flex;
//           justify-content: center;
//         }
      }
  },
  [theme.breakpoints.down("xs")]: {
    boxContainer: {
      flexDirection: "column",
      alignItems: "center"
    },
    boxLeft: {
      width: "80%",
      margin: 0,
      padding: 0,

      textContainer: {
        margin: "0 auto",
        width: "100%",
        h1: {
          fontSize: "10vw"
        },
        h5: {
          fontSize: "3vw",
          fontWeight: "normal",
          paddingTop: "2rem"
        }
      },
      imageWrapper: {
        width: "100%",
      }
    }
  }
}));

export default LoginStyles;
