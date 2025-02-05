### ReDev-Icons  

ReDev-Icons is a library compiling all the original Devicons icons without wordmarks, built on top of [Devicon](https://devicon.dev/).  

The main motivation for this library is that [Devicon](https://devicon.dev/) and other libraries built on top of it were missing the new Angular logo.

#### Usage

add dependency 
```bash
  npm install redev-icons
```

import component and use

````jsx
import {AngularIcon} from "redev-icons";

const Demo = () => {
    return (
            <AngularIcon className={"....."}/>
    );
};

export default Demo;
````
