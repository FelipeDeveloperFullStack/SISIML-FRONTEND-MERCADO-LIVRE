import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const GoogleMaps = withScriptjs(withGoogleMap((props) => {
    /**
     * <GoogleMaps 
                                                                isMarkerShow 
                                                                defaultZoom={8}
                                                                latitude={venda.dados_entrega.endereco_entrega.latitude}
                                                                longitude={venda.dados_entrega.endereco_entrega.longitude}
                                                                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                                                                loadingElement={<div style={{ height: `100%` }} />}
                                                                containerElement={<div style={{ height: `400px` }} />}
                                                                mapElement={<div style={{ height: `100%` }} />} />
     */

    return (
        <GoogleMap
            defaultZoom={props.defaultZoom}
            defaultCenter={{ lat: -18.479867, lng: -47.190484 }}>
            {props.isMarkerShow && <Marker position={{ lat: -18.479867, lng: -47.190484 }} />}
        </GoogleMap>
    )

}))

export default GoogleMaps

