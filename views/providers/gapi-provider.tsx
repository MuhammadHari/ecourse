import * as React from 'react';

type State = {
  gapiLoaded : boolean
  auth2Loaded:boolean
}

const gapiScript = document.createElement('script');
gapiScript.src = "https://apis.google.com/js/api.js";

const Context = React.createContext<null|gapi.auth2.GoogleAuth>(null)

export const useGoogleClient = () : gapi.auth2.GoogleAuth =>React.useContext(Context)

export class GapiProvider extends React.Component<any, State> {

  googleClient: null| gapi.auth2.GoogleAuth;

  constructor(props: any) {
    super(props);
    this.state = {
      gapiLoaded : false,
      auth2Loaded: false
    }
    gapiScript.addEventListener('load',this.onGapiLoaded);
    document.body.append(gapiScript);
  }

  onAuth2Loaded = () : void => {
    this.googleClient = gapi.auth2.init({
      client_id : "523836281895-ekut8aurtb036r5of9qqg3g3pqor28r7.apps.googleusercontent.com",
    })
    this.setState({auth2Loaded: true});
  }

  onGapiLoaded = (): void => {
    this.setState({gapiLoaded: true});
    gapi.load('auth2', this.onAuth2Loaded)
  }

  render(): React.ReactElement {
    const {googleClient, state, props} = this;
    const {auth2Loaded, gapiLoaded} = state;
    if (! auth2Loaded || ! gapiLoaded) return <div/>;
    return (
      <Context.Provider value={googleClient} >
        {props.children}
      </Context.Provider>
    );
  };
}
