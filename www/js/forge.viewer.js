
var viewer;
var lmvDoc;
var viewables;
var indexViewable;
var propValue;

var options = {
    env: 'AutodeskProduction',
    getAccessToken: getForgeToken
}

// GET https://developer.api.autodesk.com/modelderivative/v2/designdata/:urn/metadata/:guid/properties

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



// function showAllProperties(viewer) {
//     var instanceTree = viewer.model.getData().instanceTree;

//     var allDbIds = Object.keys(instanceTree.nodeAccess.dbIdToIndex);

//     for (var key in allDbIds) {
//         var id = allDbIds[key];
//         viewer.model.getProperties(id, function (data) {
//             var str = "";
//         });
//     }
//     return str;
// }

// function getFullPath(tree, dbId) {
//     var path = [];
//     while (dbId) {
//         var name = tree.getNodeName(dbId);
//         path.unshift(name);
//         dbId = tree.getNodeParentId(dbId);
//     }

//     // We do not care about the top 2 items because it's just the file name
//     // and root component name
//     path = path.splice(2, path.length - 1)

//     return path.join('+');
// }

// Autodesk.Viewing.Model.prototype.getProperties = function (dbId, onSuccessCallback, onErrorCallback) {
//     if (!this.myData || !this.myLoader)
//         return;

//     this.myLoader.getProperties(dbId, onSuccessCallback, onErrorCallback);
// };

var btnClickTest = document.getElementById('btnTest');
btnClickTest.addEventListener('click', function () {

    var selectionIdDbText = document.getElementById('IdDb');
    var nodeNameText = document.getElementById('nodeName');
    // Property - Číslo součásti
    var propertyValue1Text = document.getElementById('propertyValue1');
    var propertyName = "Číslo součásti";
    

    var selectionIdDb = viewer.getSelection();
    var selectionModelName = selectionIdDb.displayName;
    var selectionCount = viewer.getSelectionCount();
    var activeUrn = viewer.model.getData().urn;
    var nodeName = viewer.modelstructure.instanceTree.getNodeName(selectionIdDb);
    
    var getProperty1 = getProperties(selectionIdDb,propertyName);

    selectionIdDbText.innerText = selectionIdDb;
    nodeNameText.innerText = nodeName;
 
    // console.log(propertyValue1Text);
    propertyValue1Text.innerText = getProperty1;
    
});

// Get Properties from selected child
function getProperties(dbId, propName) {
     
    viewer.model.getBulkProperties(dbId, propName, function (objProperties) {
        
        if (dbId.length === 1) {
            objProperties[0].properties.forEach(i => {
                if (i.displayName === propName) {
                    
                    propValue = i.displayValue;

                    return propValue;
                };
            });
        }
        else 
        {
            console.log("Je vybráno více jak jedna součást")
        }
    });
    return propValue;
};

var btnClickBackgroud1 = document.getElementById('btnBackgrd1');
btnClickBackgroud1.addEventListener('click', function () {
    changeBackground();
});

var btnClickBackgroundReset = document.getElementById('btnBackgrdReset');
btnClickBackgroundReset.addEventListener('click', function () {
    resetBackground();
});

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

// function getProperties(){
//     viewer.loadExtension('Viewing.Extension.MetaProperty')
// }