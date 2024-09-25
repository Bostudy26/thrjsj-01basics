import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'


/**
 * Debug
 */

const gui = new GUI({
    width: 500,
    height: 300,
    title: 'Debug UI',
    closeFolders: false
})

gui.hide()

window.addEventListener('keydown', (event) => {
    if (event.key === 'd') {
        gui.show(gui._hidden)
    } 
})

const debugObject = {}

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
debugObject.color = '#0cd33e'
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const cubeTweaks = gui.addFolder('Awesome Cube');
// close / open
cubeTweaks.close();

// gui.add(mesh.position, 'y', -3, 3, 0.01)

// range properties
cubeTweaks.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('elevation')

// boolean properties
cubeTweaks.add(mesh, 'visible')
cubeTweaks.add(material, 'wireframe')


// color properties
cubeTweaks.addColor(debugObject, 'color')
.onChange((value) => {
    
    material.color.set(debugObject.color)
    
    // console.log('color changed')
    // console.log(material.color.getHexString())
    // console.log(value);
})

// function properties
debugObject.spin = () => {
    gsap.to(mesh.rotation, {
        duration: 1,
        y: mesh.rotation.y + Math.PI * 2
    })
}
cubeTweaks.add(debugObject, 'spin')

debugObject.subversion = 2
cubeTweaks.add(debugObject, 'subversion').min(1).max(10).step(1)
.onFinishChange(() => {
    // console.log('subversion changed')
    mesh.geometry.dispose()
    mesh.geometry =  new THREE.BoxGeometry(
        1, 1, 1,
        debugObject.subversion, debugObject.subversion, debugObject.subversion
    )
})



// let myVariable = 1337
// gui.add(myVariable, '???')

// const myObject = {
//     myVariable: 1337
// }

// gui.add(myObject, 'myVariable')

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()