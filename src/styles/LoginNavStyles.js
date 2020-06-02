import { makeStyles } from "@material-ui/core/styles";

const LoginNavStyles = makeStyles(theme => ({
  loginNav: {
    fontFamily: 'workSans',
    display: 'flex',
    justifyContent: 'spaceBetween',
    alignItems: 'center',
    width: '100%',
    textAlign: 'center',
    logoImg: {
            height: '1rem',
            width: 'auto',
          }
  },
  [theme.breakpoints.down("xs")]: {
    loginNav:{
        backgroundColor:'#505050',
        logoImg: {
            position:'absolute',
            height: '38px',
            width: '136px',
            left: '130px',
            top: '102px',
            
        }
    }
  }
}));

export default LoginNavStyles;