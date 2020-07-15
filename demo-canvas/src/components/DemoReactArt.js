import React from 'react'
import ReactArt, { Surface, Shape, Group} from 'react-art'

const DemoReactArt = () => {

    const BORDER_PATH = "M3.00191459,4 C1.34400294,4 0,.34785514 0,7.00550479 L0,220.994495 C0,222.65439 1.34239483,224 3.00191459,224 L276.998085,224 C278.655997,224 280,222.652145 280,220.994495 L280,7.00550479 C280,5.34561033 278.657605,4 276.998085,4 L3.00191459,4 Z M3.00191459,4";
    const BG_PATH = "M3.00191459,1 C1.34400294,1 0,2.34785514 0,4.00550479 L0,217.994495 C0,219.65439 1.34239483,221 3.00191459,221 L276.998085,221 C278.655997,221 280,219.652145 280,217.994495 L280,4.00550479 C280,2.34561033 278.657605,1 276.998085,1 L3.00191459,1 Z M3.00191459,1";


    return (
        <div>
                <Surface
                    width={1500}
                    height={1500}
                >   
                    <Group x={210} y={135}>
                        <Shape fill="rgba(0,0,0,0.1)" d={BORDER_PATH} />
                        <Shape fill="#7BC7BA" d={BG_PATH} />
                    </Group>

                </Surface>
            aa        
        </div>
    )
}

export default DemoReactArt