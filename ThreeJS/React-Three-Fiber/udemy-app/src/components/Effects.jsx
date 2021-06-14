import { EffectComposer, DepthOfField, Bloom, Noise, Vignette, GodRays } from '@react-three/postprocessing'
import { useState, useEffect } from 'react'
import { useThree} from '@react-three/fiber'

const Effects = () => {
    const [lights, setLights] = useState(null)
    const { scene } = useThree()
    useEffect(() => {
        if (scene.lights && scene.lights.length === 3)
            setLights(scene.lights)
    }, [scene.lights])
    return (
        lights ? 
        <EffectComposer>
            <DepthOfField
                focusDistance={0}
                focalLength={0.02}
                bokehScale={2}
                height={480}
            />
            {/* {lights.map(light => 
                <GodRays 
                    key={light.current.uuid} 
                    sun={light.current}
                />
            )} */}
            {/* <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
            <Noise opacity={0.02} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} /> */}
        </EffectComposer>
        :
        null
    )
}

export default Effects