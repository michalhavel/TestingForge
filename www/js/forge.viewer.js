
var viewer;
var lmvDoc;
var viewables;
var indexViewable;

var options = {
    env: 'AutodeskProduction',
    getAccessToken: getForgeToken
}


var documentId;

var myEl = document.getElementById('btn1');
myEl.addEventListener('click', function () {
    documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDE4LTAyLTI4LTA4LTI1LTE0LWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlL0QtNjIwLTAwMC1ObyUyMEV4cHJlc3MuZHdmeA';

    Autodesk.Viewing.Initializer(options, function onInitialized() {
        Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
        viewer.loadModel();
    });
});

var myE2 = document.getElementById('btn2');
myE2.addEventListener('click', function () {
    documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDE4LTAyLTI4LTExLTQ0LTQzLWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlL1NIQUZULmlwdA';

    Autodesk.Viewing.Initializer(options, function onInitialized() {
        Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
        viewer.loadModel();

    });
    var propertyText = document.getElementById('property')

    propertyText.innerText = "Načítání modelu Hřídel"

});

var myE3 = document.getElementById('btn3');
myE3.addEventListener('click', function () {
    documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDE4LTAzLTA2LTE1LTI3LTMyLWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlL0NoYWlyLmR3Zw';
    Autodesk.Viewing.Initializer(options, function onInitialized() {
        Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
        viewer.loadModel();
    });
});

// Autodesk.Viewing.Initializer(options, function onInitialized() {
//     Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);

// });

/**
* Autodesk.Viewing.Document.load() success callback.
* Proceeds with model initialization.
*/
function onDocumentLoadSuccess(doc) {

    // A document contains references to 3D and 2D viewables.
    viewables = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), {
        'type': 'geometry',
        'role': '3d'
    }, true);
    if (viewables.length === 0) {
        console.error('Document contains no viewables.');
        return;
    }

    // Create Viewer instance and load model.
    var viewerDiv = document.getElementById('MyViewerDiv');
    viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv);
    var errorCode = viewer.start();

    // Check for initialization errors.
    if (errorCode) {
        console.error('viewer.start() error - errorCode:' + errorCode);
        return;
    }

    // Choose any of the available viewables.
    indexViewable = 0;
    lmvDoc = doc;

    // Everything is set up, load the model.
    loadModel();
}

function loadModel() {
    var initialViewable = viewables[indexViewable];
    var svfUrl = lmvDoc.getViewablePath(initialViewable);
    var modelOptions = {
        sharedPropertyDbPath: lmvDoc.getPropertyDbPath()
    };
    viewer.loadModel(svfUrl, modelOptions, onLoadModelSuccess, onLoadModelError);
}

/**
 * Autodesk.Viewing.Document.load() failuire callback.
 */
function onDocumentLoadFailure(viewerErrorCode) {
    console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

function loadNextModel() {
    viewer.tearDown();
    viewer.setUp(viewer.config);

    // Next viewable index. Loop back to 0 when overflown.
    indexViewable = (indexViewable + 1) % viewables.length;
    loadModel();
}

/**
 * viewer.loadModel() success callback.
 * Invoked after the model's SVF has been initially loaded.
 * It may trigger before any geometry has been downloaded and displayed on-screen.
 */
function onLoadModelSuccess(model) {
    console.log('onLoadModelSuccess()!');
    console.log('Validate model loaded: ' + (viewer.model === model));
    console.log(model);
}
/**
 * viewer.loadModel() failure callback.
 * Invoked when there's an error fetching the SVF file.
 */
function onLoadModelError(viewerErrorCode) {
    console.error('onLoadModelError() - errorCode:' + viewerErrorCode);
}



///////////////////////////////////////////////////////////////////////////
// Gets all existing properties from components list
//
///////////////////////////////////////////////////////////////////////////
// function getAvailableProperties(components, onResult) {
//     var propertiesMap = {};
//     async.each(components,
//         function (component, callback) {
//             viewer.getProperties(component.dbId, function (result) {
//                 for (var i = 0; i < result.properties.length; i++) {
//                     var prop = result.properties[i];
//                     propertiesMap[prop.displayName] = {};
//                 }
//                 callback();
//             });
//         },
//         function (err) {
//             onResult(Object.keys(propertiesMap));
//         });
// };

//  var matches = [];

//   // Creates a thunk for our task
//   // We look for all components which have a
//   // property named 'Material' and returns a list
//   // of matches containing dbId and the prop value
//   var taskThunk = function(model, dbId) {

//     return hasPropertyTask(
//      model, dbId, 'Materiál', matches);
//  }

//  var taskResults = executeTaskOnModelTree(
//    viewer.model, taskThunk);

//  Promise.all(taskResults).then(function(){

//    console.log('Found ' + matches.length + ' matches');
//    console.log(matches);
// });

var btnClickTest = document.getElementById('btnTest');
btnClickTest.addEventListener('click', function () {

    var propertyText = document.getElementById('property');
    var selectionIdDb = viewer.getSelection();
    var selectionModelName = selectionIdDb.displayName;
    var selectionCount = viewer.getSelectionCount();
    var modelName = '';
    // var propertiesArray = getProperties(selectionIdDb);
    var activeUrn = viewer.model.getData().urn;
    var mass = viewer.model.getBulkProperties(selectionIdDb,['Materiál']);
    var material = '';
    // var nodeAll = GuiViewer3D.dbId;
    var neco = selectionIdDb.getBulkProperties;

    propertyText.innerText = neco;

    // propertyText.innerText = hasPropertyTask(viewer.model,viewer.getSelection().dbId,'Materiál',matches).displayValue

});

var btnClickBackgroud1 = document.getElementById('btnBackgrd1');
btnClickBackgroud1.addEventListener('click', function () {
    changeBackground();
});

var btnClickBackgroundReset = document.getElementById('btnBackgrdReset');
btnClickBackgroundReset.addEventListener('click', function () {
    resetBackground();
});

//GetProperties

// var guidToNodeIdMapping = null;

// function createGuidToNodeMapping(modelRoot) {
//     var nodesToProcess = [];
//     var currentMapping = {};

//     // Get all the nodes rooted at this model root.
//     //
//     function getAllNodes(root) {
//         if (root.children) {
//             for (var k = 0; k < root.children.length; k++) {
//                 var child = root.children[k];
//                 nodesToProcess.push(child);
//                 getAllNodes(child);
//             }
//         }
//     }

//     getAllNodes(modelRoot);

//     function processNode(node, onNodeProcessed) {
//         // Gets the property value for the given property name, if it exists.
//         //
//         function getPropertyValue(properties, propertyName) {
//             for (var i = 0; i < properties.length; ++i) {
//                 var property = properties[i];
//                 if (property.displayName === propertyName) {
//                     return property.displayValue;
//                 }
//             }
//             return null;
//         }

//         // When the properties are retrieved, map the node's guid to its id,
//         // if the guid exists.
//         //
//         function onPropertiesRetrieved(result) {
//             var guid = getPropertyValue(result.properties, 'Guid');
//             if (guid) {
//                 currentMapping[guid] = node.dbId;
//             }

//             onNodeProcessed();
//         }

//         // On error, move on to the next node.
//         //
//         function onError(status, message, data) {
//             onNodeProcessed();
//         }

//         viewer.getProperties(node.dbId, onPropertiesRetrieved, onError);
//     }

//     // Process the nodes one by one.
//     //
//     function processNext() {
//         if (nodesToProcess.length > 0) {
//             processNode(nodesToProcess.shift(), processNext);
//         } else {
//             // No more nodes to process - the mappings are complete.
//             //
//             guidToNodeIdMapping = currentMapping;
//         }
//     }

//     processNext();
// }

// viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, function (e) {
//     if (viewer.model) {
//         viewer.model.getObjectTree(function (root) {
//             createGuidToNodeMapping(root);
//         });
//     }
// });

// viewer.getNodeIdByGuid = function (guid) {
//     if (guidToNodeIdMapping && guid in guidToNodeIdMapping) {
//         return guidToNodeIdMapping[guid];
//     }
//     return null;
// };

//  function hasPropertyTask(model, dbId, propName, matches) {

//        return new Promise(function(resolve, reject){

//          model.getProperties(dbId, function(result) {

//           if(result.properties) {

//             for (var i = 0; i < result.properties.length; ++i) {

//               var prop = result.properties[i];

//               //check if we have a match
//               if (prop.displayName == propName) {

//                 var match = {
//                   dbId: dbId
//                 }

//                 match[propName] = prop.displayValue;

//                 matches.push(match);
//               }
//             }
//           }

//           return resolve();

//         }, function() {

//           return reject();
//         });
//       });
//     }

//     var matches = [];

//   // Creates a thunk for our task
//   // We look for all components which have a
//   // property named 'Material' and returns a list
//   // of matches containing dbId and the prop value
//   var taskThunk = function(model, dbId) {

//     return hasPropertyTask(
//      model, dbId, 'Material', matches);
//  }

//  var taskResults = executeTaskOnModelTree(
//    viewer.model, taskThunk);

//  Promise.all(taskResults).then(function(){

//    console.log('Found ' + matches.length + ' matches');
//    console.log(matches);
//  });


// var btnClickResetBackgroud




/////////////////////////////////////////////////////////////////////////////////
//
// Load Viewer Background Color Extension
//
/////////////////////////////////////////////////////////////////////////////////

function changeBackground() {
    viewer.setBackgroundColor(150, 59, 111, 255, 255, 255);
}

/////////////////////////////////////////////////////////////////////////////////
//
// Unload Viewer Background Color Extension
//
/////////////////////////////////////////////////////////////////////////////////

function resetBackground() {
    viewer.setBackgroundColor(169, 169, 169, 255, 255, 255);
}

/////////////////////////////////////////////////////////////////////////////////
//
// Load Viewer Markup3D Extension
//
/////////////////////////////////////////////////////////////////////////////////
// 3D Markup extension to display values of the selected objects in the model. 

function loadMarkup3D() {
    viewer.loadExtension('Viewing.Extension.Markup3D');
}

/////////////////////////////////////////////////////////////////////////////////
//
// Load Viewer Transform Extension
//
/////////////////////////////////////////////////////////////////////////////////
// Transformation is allowed with this extension to move object selected in the XYZ
// position or rotation in XYZ as well.

function loadTransform() {
    viewer.loadExtension('Viewing.Extension.Transform');
}

/////////////////////////////////////////////////////////////////////////////////
//
// Load Viewer Control Selector Extension
//
/////////////////////////////////////////////////////////////////////////////////
// This extension allows you to remove certain extensions from the original toolbar 
// provided to you.

function loadControlSelector() {
    viewer.loadExtension('_Viewing.Extension.ControlSelector');
}

var viewingProp = require('../js/extensions/Autodesk.ADN.Viewing.Extension.Chart');

console.log(typeof viewingProp.getProp(viewer.getSelection()));


// function getProperties(){
//     viewer.loadExtension('Viewing.Extension.MetaProperty')
// }