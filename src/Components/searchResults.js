import React from "react";
import Button from "@material-ui/core/Button";




const Results=props=>
    props.getsearch.map( ( ( value, index ) => <div key={value.key}><p>
        <strong>{ index + 1 }</strong><br/><strong>Description:</strong>{ value.desc }<br/><strong>Location:</strong>{ value.location }<br/><strong>Type:</strong>{ value.type }
    </p>
          <Button
              variant="contained"
              onClick={props.offerHelp}
              itemID={value.key}
          >
            Offer Help
          </Button>
    </div>
));

export default Results;
