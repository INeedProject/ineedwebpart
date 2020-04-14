import React from "react";




const Results=props=>
    props.getsearch.map( ( ( value, index ) => <div><p>
        <strong>{ index + 1 }</strong><br/><strong>Description:</strong>{ value.desc }<br/><strong>Location:</strong>{ value.location }<br/><strong>Type:</strong>{ value.type }
    </p>
        <input type="submit" value="OfferHelp" onClick={ props.offerHelp } id={ value.key }/></div>
));

export default Results;
