/**
 * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Meta Spark Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//
// Meta Spark Studio extension for VS Code - https://fb.me/spark-vscode-plugin
//
// For projects created with v87 onwards, JavaScript is always executed in strict mode.
//==============================================================================

// How to load in modules
const Scene = require('Scene');
const FaceTracking = require('FaceTracking');

// Use export keyword to make a symbol available in scripting debug console
export const Diagnostics = require('Diagnostics');

// To use variables and functions across files, use export/import keyword
// export const animationDuration = 10;

// Use import keyword to import a symbol from another file
// import { animationDuration } from './script.js'

;(async function () {  // Enables async/await in JS [part 1]

   const face = FaceTracking.face(0);
   const [text3D] = await Promise.all([Scene.root.findFirst('3dText0')]);
    face.cameraTransform.rotationZ.monitor({ fireOnInitialValue: true }).subscribe(zRotation =>
    { text3D.text = checkDiraction(zRotation.newValue, face.cameraTransform.rotationY.pinLastValue()); });

    face.cameraTransform.rotationY.monitor({ fireOnInitialValue: true }).subscribe(yRotation =>
    { text3D.text = checkDiraction(yRotation.newValue, face.cameraTransform.rotationZ.pinLastValue()); });
  
  
    function checkDiraction(zRotation, yRotation) {
        let direction = "Ramadan Kareem";

        if (zRotation > 0.2 || yRotation > 0.2) {
            direction = "Ramadan";
        } else if (zRotation < -0.2 || yRotation < -0.2) {
            direction = "Kareem";
        }
        if (Math.abs(zRotation) <= 0.2 && Math.abs(yRotation) <= 0.2) {
            direction = "Ramadan Kareem";
        }
        return direction;
    }


})(); // Enables async/await in JS [part 2]
