import React from "react";
import Button from "@material-ui/core/Button";




const Results=props=>
    props.getsearch.map( ( ( value, index ) => <tbody><tr key={index}><td>
      { value.desc }</td><td>{ value.location }</td><td>{ value.type }
</td>
  <td>
          <Button
              variant="contained"
              onClick={props.offerHelp}
              itemID={value.key}
          >
            Offer Help
          </Button>
  </td>
        </tr>
    </tbody>
));

export default Results;
