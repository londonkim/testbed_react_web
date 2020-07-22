import React, {Suspense} from 'react'
import {useImage} from 'react-image'

function KImage(url) {
  const {src} = useImage({
    srcList: 'https://2.bp.blogspot.com/--5yqttOEAsw/Urr9mw2ptsI/AAAAAAAADME/uR7L1d-5y50/w144-h144-p-k-no-nu/howways-logo2-94x94.png',
  })

  return (<Suspense><img src={src} width={100} height={100}></img></Suspense>)
}

export default KImage