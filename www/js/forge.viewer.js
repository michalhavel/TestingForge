
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
// Funkce pro odebrání tlačítek z toobaru
function removeControls(viewer, buttonName) {
    var controlToolbar;
    controlToolbar = viewer.toolbar.getControl('modelTools');
    controlToolbar.removeControl(buttonName);
}

// Funkce pro přidání tlačítek do kontextového menu
function addBtnContextMenu(viewer) {
    viewer.registerContextMenuCallback('MyMenu', (menu, status) => {
        if (status.hasSelected) {
            addColorBtn(menu, viewer, 'Red', new THREE.Vector4(255, 0, 0, 1));
            addColorBtn(menu, viewer, 'Green', new THREE.Vector4(0, 255, 0, 1));
            addEventSelBtn(menu, viewer, 'Load Event Select');
            addDisableEventSelBtn(menu, viewer, 'Unload Event Select');
            addToList(menu, viewer, 'To List');
            addClearList(menu, viewer, 'Clear List');
            addCreateTable(menu, viewer, 'Create table');

        } else {
            menu.push({
                title: 'Clear overridden color',
                target: () => {
                    viewer.clearThemingColors();
                }
            });
        }
    });
}

function addColorBtn(menu, viewer, btnColorName, colorRgb) {
    menu.push({
        title: btnColorName,
        target: () => {
            const selSet = viewer.getSelection();
            viewer.clearSelection();
            const color = colorRgb;
            for (let i = 0; i < selSet.length; i++) {
                viewer.setThemingColor(selSet[i], color);
            }
        }
    });
}

function addEventSelBtn(menu, viewer, btnName) {
    menu.push({
        title: btnName,
        target: () => {
            const selSet = viewer.getSelection();
            viewer.addEventListener(
                Autodesk.Viewing.SELECTION_CHANGED_EVENT,
                onSelectionChanged);

        }
    });

}

function addDisableEventSelBtn(menu, viewer, btnName) {
    menu.push({
        title: btnName,
        target: () => {
            const selSet = viewer.getSelection();
            viewer.removeEventListener(
                Autodesk.Viewing.SELECTION_CHANGED_EVENT,
                onSelectionChanged);

        }
    });

}

//----------------------------------------------------------------------------------
//Funkce ToList - pridani properties do tabulky z oznacene soucasti
function addToList(menu, viewer, btnName) {
    menu.push({
        title: btnName,
        target: () => {
            const selSet = getSelection();

            //Zapnuti onselection event
            viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT,
                onSelectionChanged);

            // Ted se musi spustit ziskani vsech vlastnosti
            var selectionIdDb = viewer.getSelection();

            // Hodnoty do tabulky
            // setPartNumber(selectionIdDb);
            // setStockNumber(selectionIdDb);
            // setName(selectionIdDb);
            function toList() {
                var selectedArray = viewer.getSelection();
                var rowNum = parseInt(0);
                for (var i = 0; i < selectedArray.length; i++) {
                    rowNum += parseInt(1);

                    getProperyTb('tbName', i, rowNum, 'Název');
                    getProperyTb('tbStockNumber', i, rowNum, 'Skladové číslo');
                    getProperyTb('tbPartNumber', i, rowNum, 'Číslo součásti')
                }

                var tbQtyText = document.getElementById('tbQty');
                tbQtyText.innerText = viewer.getSelectionCount();
            }

            toList();

            //Vypnuti onselection event
            viewer.removeEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT,
                onSelectionChanged);

        }
    })
}
//-----------------------------------------------------------------------------------------

function createTable() {
    var resultTable = '';
    var rowNum = parseInt(0);
    var selectedArray = viewer.getSelection();
    for (var i = 0; i < selectedArray.length; i++) {
        // const element = selectedArray[i]; 
        rowNum += parseInt(1);
        resultTable += '<tr class="white-text"><th scope="row">' + rowNum
        resultTable += '<\/th><td id="tbName' + rowNum + '"'
        resultTable += '>-<\/td>'
        resultTable += '<td id="tbPartNumber' + rowNum + '">-<\/td><td id="tbStockNumber' + rowNum + '">-<\/td><td id="tbQty">-<\/td><\/tr>';

    }
    // resultTable += '<tr><\/tr>';

    return resultTable;
}


function getProperyTb(propName, selectionIdDb, rowNum, propDisplayName) {
    // var selectedArray = viewer.getSelection();
    var propertyNameText = '';
    //Ziskani a nastaveni jmena        
    propertyNameText = propName + rowNum

    function setNameText(params) {
        var propertyValue1Text = document.getElementById(propertyNameText);
        propertyValue1Text.innerText = params;
    }

    function setName(selectionIdDb) {
        getProperties(selectionIdDb, propDisplayName, setNameText)
    }

    setName(selectionIdDb);
    //  return propertyNameText
}

//Funkce na pridavani radku do tabulky (kusovniku)
//Pro kazdy oznacenou komponentu se zalozi radek a vyplni se property

function addCreateTable(menu, viewer, btnName) {
    menu.push({
        title: btnName,
        target: () => {
            const selSet = viewer.getSelection();
            //Zapnuti onselection event
            // viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT,
            //     onSelectionChanged);

                
                // viewer.clearSelection();
                // const color = colorRgb;
                // for (let i = 0; i < selSet.length; i++) {
                //  viewer.setThemingColor(selSet[i], color);
                // }
            var targetTable = document.getElementById('myTable');
            targetTable.innerHTML = createTable();

            var selectionIdDb = viewer.getSelection();
            var selectedArray = viewer.getSelection();
            var rowNum = parseInt(0);
            for (let i = 0; i < selSet.length; i++) {
                rowNum += parseInt(1);

                getProperyTb('tbName',selSet, rowNum, "Název");
                getProperyTb('tbStockNumber', selSet, rowNum, "Skladové číslo");
                getProperyTb('tbPartNumber', selSet, rowNum, "Číslo součásti");
                var tbQtyText = document.getElementById('tbQty');
                tbQtyText.innerText = viewer.getSelectionCount();
            }

            // setPartNumber(selectionIdDb);
            // setStockNumber(selectionIdDb);
            // var tbQtyText = document.getElementById('tbQty');
            // tbQtyText.innerText = viewer.getSelectionCount();
            //Vypnuti onselection event


            // viewer.removeEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT,
            //     onSelectionChanged);

        }

    })

}

//------------------------------------------------------------------------------------------
//Kontetove tlacisko na vycisteni tabulky
function addClearList(menu, viewer, btnName) {
    menu.push({
        title: btnName,
        target: () => {
            document.getElementById('tbQty').innerText = "-";
            document.getElementById('tbName').innerText = "-";
            document.getElementById('tbStockNumber').innerText = "-";
            document.getElementById('tbPartNumber').innerText = "-";

        }
    })
}
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
    // Odebre požadované ikony z toolbaru
    removeControls(viewer, 'toolbar-explodeTool');
    addBtnContextMenu(viewer);
}
/**
 * viewer.loadModel() failure callback.
 * Invoked when there's an error fetching the SVF file.
 */
function onLoadModelError(viewerErrorCode) {
    console.error('onLoadModelError() - errorCode:' + viewerErrorCode);
}

var btnClickBackgroud1 = document.getElementById('btnBackgrd1');
btnClickBackgroud1.addEventListener('click', function () {
    changeBackground();
})

var btnClickBackgroundReset = document.getElementById('btnBackgrdReset');
btnClickBackgroundReset.addEventListener('click', function () {
    resetBackground();
})

var btnClickTest = document.getElementById('btnTest');
btnClickTest.addEventListener('click', function () {

    viewer.addEventListener(
        Autodesk.Viewing.SELECTION_CHANGED_EVENT,
        onSelectionChanged);
})

function onSelectionChanged(event) {

    var selectionIdDbText = document.getElementById('IdDb');
    var nodeNameText = document.getElementById('nodeName');
    var propertyValue1Text = document.getElementById('propertyValue1');
    var selectionIdDb = viewer.getSelection();

    var nodeName = viewer.modelstructure.instanceTree.getNodeName(selectionIdDb);
    // getProperty1 = getProperties(selectionIdDb, propertyName);
    // setPartNumber(selectionIdDb);

    // propertyValue1Text.innerText = getProperty1;
    selectionIdDbText.innerText = selectionIdDb;
    nodeNameText.innerText = nodeName;

    // // Property - Číslo součásti
    // var propertyName = "Číslo součásti";

    // var getProperty1 = getProperties(selectionIdDb, propertyName);

    // var selectionModelName = selectionIdDb.displayName;
    // var selectionCount = viewer.getSelectionCount();
    // var activeUrn = viewer.model.getData().urn;

}
//------------------------------------------------------------------------------
//Funkce na ziskani libovolne property z oznacene komponenty
var myPropValue = null;
function getProperties(dbId, propName, callback) {

    viewer.model.getBulkProperties(dbId, propName, function (objProperties) {
        var propertyArray = objProperties[0].properties;

        for (var i = 0; i < propertyArray.length; i++) {

            if (propertyArray[i].displayName == propName) {
                // myPropValue = null;
                myPropValue = propertyArray[i].displayValue;

                // console.log("První log: " + myPropValue);

                callback(myPropValue);
            }

        }
    })

}
//----------------------------------------------------------------------------------
//Získání a nastavení čísla součásti
// var propertyNameText = 'tbPartNumber'
// function setPartNumberText(params) {
//     var propertyValue1Text = document.getElementById('tbPartNumber');
//     propertyValue1Text.innerText = params;
// }

// function setPartNumber(selectionIdDb) {
//     getProperties(selectionIdDb, "Číslo součásti", setPartNumberText)
// }
// //-------------------------------------------------------------------
// //Ziskani a nastaveni skladoveho cisla
// function setStockNumberText(params) {
//     var propertyValue1Text = document.getElementById('tbStockNumber');
//     propertyValue1Text.innerText = params;
// }

// function setStockNumber(selectionIdDb) {
//     getProperties(selectionIdDb, "Skladové číslo", setStockNumberText)
// }

//Ziskani a nastaveni jmena
// var propertyNameText = 'tbName'
// function setNameText(params) {
//     var propertyValue1Text = document.getElementById(propertyNameText);
//     propertyValue1Text.innerText = params;
// }

// function setName(selectionIdDb) {
//     getProperties(selectionIdDb, "Název", setNameText)
// }
//-----------------------------------------------------------------

//Priklad na pridani tlacitka do kontextoveho menu
viewer.contextMenuCallbacks('MyButtons', (menu, status) => {
    if (status.hasSelected) {
        menu.push({
            title: 'MyButton 1',
            target: () => {
                const selSet = this.viewer.getSelection();
                this.viewer.clearSelection();

                const color = new THREE.Vector4(255 / 2585, 0, 0, 1);
                for (let i = 0; i < selSet.length; i++) {
                    this.viewer.setThemingColor(selSet[i], color);
                }
            }
        });

    } else {
        menu.push({
            title: 'Clear overridden color',
            target: () => {
                this.viewer.clearThemingColors();
            }
        });

    }
});


// viewer.removeEventListener(
//     Autodesk.Viewing.SELECTION_CHANGED_EVENT,
//     onSelectionChanged);

// (this.viewer.toolbar.getControl('modelTools')).setToolTip('Neco')

// //////////////////////////////////////////////////////////////////////////////////
// Context menu add cmd
/////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////
//
// Load Viewer Background Color Extension
//
/////////////////////////////////////////////////////////////////////////////////

function changeBackground() {
    viewer.setBackgroundColor(51, 51, 204, 255, 255, 255);
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

function EventsTutorial() {
    viewer.loadExtension('Autodesk.ADN.Viewing.Extension.EventWatcher.js');
}

