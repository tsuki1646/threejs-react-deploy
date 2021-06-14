import { 
    DragControls 
} from 'three/examples/jsm/controls/DragControls';
import {useRef, useEffect, useState} from 'react';
import {extend, useThree} from '@react-three/fiber';
extend({DragControls});

const DragableTest = props =>{
    const groupRef = useRef();
    const controlsRef = useRef();
    const [children, setChildren] = useState([]);
    const {camera, gl, scene} = useThree();
    
    useEffect(() =>{
        //console.log(groupRef.current)
        setChildren(groupRef.current.children)
    }, [])

    useEffect(() =>{
        controlsRef.current.addEventListener(
            'hoveron', 
            //e => console.log(scene)
            e => scene.orbitControls.enabled = false
        );
        controlsRef.current.addEventListener(
            'hoveroff', 
            //e => console.log(scene)
            e => scene.orbitControls.enabled = true
        );
        controlsRef.current.addEventListener(
            'dragstart', 
            //e => console.log(scene)
            e => {
                e.object.api?.mass.set(0)
                //console.log(e.object)
            }
        );
        controlsRef.current.addEventListener(
            'dragend', 
            //e => console.log(scene)
            e => {e.object.api?.mass.set(1)}
        );
        controlsRef.current.addEventListener(
            'drag', 
            //e => console.log(scene)
            //e => console.log(e.object.position)
            e => {
                e.object.api?.position.copy(e.object.position)
                e.object.api?.velocity.set(0,0,0)
            }
        );
    }, [children, scene.orbitControls])
    //console.log(props.children)

    return(
        <group ref={groupRef}>
            <dragControls 
                transformGroup={props.transformGroup}
                ref = {controlsRef} 
                args ={[children, camera, gl.domElement]}/>
            {props.children}
        </group>
    )
}
export default DragableTest;