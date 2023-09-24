import * as THREE from 'three'
import { useLayoutEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Center, AccumulativeShadows, RandomizedLight, OrbitControls, Environment, useGLTF, Lightformer, GradientTexture } from '@react-three/drei'
import { FlakesTexture } from 'three-stdlib'
import { EffectComposer, Bloom } from '@react-three/postprocessing'


export default function App() {

  return (
    <Canvas shadows camera={{ position: [0, 2, 6], fov: 25 }} style={{height: '100vh'}}>
		<group position={[0, -0.5, 0]}>
			<Center top>
				<Suzi/>
			</Center>
			<AccumulativeShadows temporal frames={100} color="black" colorBlend={2} toneMapped={true} alphaTest={0.75} opacity={1} scale={16}>
				<RandomizedLight intensity={Math.PI} amount={8} radius={8} ambient={0.5} position={[5, 5, -10]} bias={0.001} />
			</AccumulativeShadows>
		</group>

		<OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2} />

		<Environment preset="apartment" >
			<Lightformer intensity={40} rotation-y={Math.PI / 2} position={[-5, 1, 1]} scale={[20, 1, 1]} />
			<Lightformer intensity={20} rotation-y={Math.PI / 2} position={[-5, 4, -1]} scale={[20, 0.9, 1]} />
			<Lightformer intensity={40} rotation-y={Math.PI / 2} position={[10, 10, 10]} scale={[20, 1, 1]} />
		</Environment>

		<EffectComposer disableNormalPass>
			<Bloom mipmapBlur luminanceThreshold={4.5}/>
		</EffectComposer>
    </Canvas>
  )
}

function Suzi(props) {
	const { scene, materials, nodes } = useGLTF('./model.gltf')
	console.log(nodes)
	useLayoutEffect(() => {
		scene.traverse((obj) => obj.isMesh && (obj.receiveShadow = obj.castShadow = true))

		materials["SD"].color.set('#004E89')
		materials["SD"].roughness = .1
		materials["SD"].normalMap = new THREE.CanvasTexture(new FlakesTexture(), THREE.UVMapping, THREE.RepeatWrapping, THREE.RepeatWrapping)
		materials["SD"].normalMap.repeat.set(80, 100)
		materials["SD"].normalScale.set(0.1, 0.2)

		materials["ScreenBlack"].color.set('#000223')
		materials["ScreenBlack"].roughness = .75
		materials["ScreenBlack"].normalMap = new THREE.CanvasTexture(new FlakesTexture(), THREE.UVMapping, THREE.RepeatWrapping, THREE.RepeatWrapping)
		materials["ScreenBlack"].normalMap.repeat.set(10, 10)
		materials["ScreenBlack"].normalScale.set(0.1, 0.1)

		materials["Screen"].color.set('#142e00')
		materials["Screen"].roughness = 1
		materials["Screen"].normalMap = new THREE.CanvasTexture(new FlakesTexture(), THREE.UVMapping, THREE.RepeatWrapping, THREE.RepeatWrapping)
		materials["Screen"].normalMap.repeat.set(10, 10)
		materials["Screen"].normalScale.set(0.1, 0.1)

		materials["Grass"].color.set('#44935C')
		materials["Grass"].roughness = 1
		materials["Grass"].normalMap = new THREE.CanvasTexture(new FlakesTexture(), THREE.UVMapping, THREE.RepeatWrapping, THREE.RepeatWrapping)
		materials["Grass"].normalMap.repeat.set(10, 10)
		materials["Grass"].normalScale.set(0.1, 0.1)

		materials["Plant"].color.set('#7EB952')
		materials["Plant"].roughness = 1
		materials["Plant"].normalMap = new THREE.CanvasTexture(new FlakesTexture(), THREE.UVMapping, THREE.RepeatWrapping, THREE.RepeatWrapping)
		materials["Plant"].normalMap.repeat.set(10, 10)
		materials["Plant"].normalScale.set(0.1, 0.1)

		materials["Pipe"].color.set('#1C5624')
		materials["Pipe"].roughness = 0

		materials["Lava"].color.set('#CAFFBF')
		materials["Lava"].transparent = true
		materials["Lava"].opacity = 1
		materials["Lava"].roughness = 0
		materials["Lava"].polygonOffset = true
		materials["Lava"].polygonOffsetFactor = 1
		materials["Lava"].envMapIntensity = .85
		materials["Lava"].side = THREE.FrontSide
		materials["Lava"].blending = THREE.AdditiveBlending

		materials["Cassete"].color.set('#CAFFBF')
		materials["Cassete"].transparent = true
		materials["Cassete"].opacity = 1
		materials["Cassete"].roughness = 0
		materials["Cassete"].polygonOffset = true
		materials["Cassete"].polygonOffsetFactor = 1
		materials["Cassete"].envMapIntensity = 1
		materials["Cassete"].side = THREE.FrontSide
		materials["Cassete"].blending = THREE.AdditiveBlending

		materials["Snow.002"].color.set('#ffffff')
		materials["Snow.002"].transparent = true
		materials["Snow.002"].opacity = 1
		materials["Snow.002"].roughness = 0
		materials["Snow.002"].polygonOffset = true
		materials["Snow.002"].polygonOffsetFactor = 1
		materials["Snow.002"].envMapIntensity = 1
		materials["Snow.002"].side = THREE.FrontSide
		materials["Snow.002"].blending = THREE.AdditiveBlending

		materials["HongoRojo"].color.set('#94150C')
		materials["HongoRojo"].roughness = .9
		materials["HongoRojo"].normalMap = new THREE.CanvasTexture(new FlakesTexture(), THREE.UVMapping, THREE.RepeatWrapping, THREE.RepeatWrapping)
		materials["HongoRojo"].normalMap.repeat.set(10, 10)
		materials["HongoRojo"].normalScale.set(0.1, 0.1)

		materials["HongoBlanco"].color.set('#F4E1C9')
		materials["HongoBlanco"].roughness = .9
		materials["HongoBlanco"].normalMap = new THREE.CanvasTexture(new FlakesTexture(), THREE.UVMapping, THREE.RepeatWrapping, THREE.RepeatWrapping)
		materials["HongoBlanco"].normalMap.repeat.set(10, 10)
		materials["HongoBlanco"].normalScale.set(0.1, 0.1)
	})

	return (
		<group {...props} dispose={null}>
			<primitive object={scene} {...props}>
				<mesh geometry={nodes['Cassete'].geometry} position={nodes['Cassete'].position} >
					<meshBasicMaterial>
						<GradientTexture
							stops={[0, .2, .4, .6, .8, 1]} 
							colors={['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF', '#B4FBE2', '#BDB2FF']} 
						/>
					</meshBasicMaterial>
				</mesh>

				<mesh geometry={nodes['Mesh'].geometry} position={nodes['Mesh'].position} >
					<meshBasicMaterial>
						<GradientTexture
							stops={[0, 1]} 
							colors={['#A9F96E', '#44935C']} 
						/>
					</meshBasicMaterial>
				</mesh>
			</primitive> 
  		</group>
	)
}
