import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const group = new THREE.Group()
group.position.y = 1
group.scale.y = 0.5
group.rotation.y = 1
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
group.add(cube1) 

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
cube2.position.x = - 2
group.add(cube2) 

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
cube3.position.x = 2
group.add(cube3) 


// Axes helper
// parameter is the length of the axes
const axesHelper1 = new THREE.AxesHelper()
const axesHelper2 = new THREE.AxesHelper()
const axesHelper3 = new THREE.AxesHelper()
cube1.add(axesHelper1)
cube2.add(axesHelper2)
cube3.add(axesHelper3)


// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)
// // mesh.position.x = 0.7
// // mesh.position.y = - 0.6
// // mesh.position.z = 1
// // or 
// //                 x ,   y  , z
// mesh.position.set(0.7, - 0.6, 1)

// // normalize() sets the vector's length to 1
// //mesh.position.normalize()

// /**
//  * Scale
//  */
// // mesh.scale.x = 2
// // mesh.scale.y = 0.25
// // mesh.scale.z = 0.5
// // or 
// //             x,    y,  z
// mesh.scale.set(2, 0.25, 0.5)

// /**
//  * Rotation
//  */
// mesh.rotation.reorder('YXZ');
// mesh.rotation.y = Math.PI
// mesh.rotation.x = Math.PI / 2
// mesh.rotation.z = Math.PI





// console.log("position Length: " + mesh.position.length()) 

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// Axes helper colors
// x axis is red
// y axis is green
// z axis is blue
// camera.position.x = 1
// camera.position.y = 1
camera.position.z = 3

scene.add(camera)

// camera.lookAt(mesh.position)

// console.log("Camera: " + mesh.position.distanceTo(camera.position)) 

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)