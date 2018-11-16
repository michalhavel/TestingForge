var viewer;
var lmvDoc;
var viewables;
var indexViewable;
var documentId;
var options = {
    env: 'AutodeskProduction',
    getAccessToken: getForgeToken
}

//Funkce pro získání elementu z HTML dle názvu
function getElById(name) {
    return document.getElementById(name)
}

// Create Viewer instance
var viewerDiv = getElById('MyViewerDiv');
viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv);
//--------------------------------------------------------------------------------
//Reakce na výběr z dropdown menu v HTML - výběr modelu pro zobrazení v prohlížeči
// getElById('asm1').addEventListener('click', function () {
//     documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDE4LTAyLTI4LTA4LTI1LTE0LWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlL0QtNjIwLTAwMC1ObyUyMEV4cHJlc3MuZHdmeA'

//     Autodesk.Viewing.Initializer(options, function onInitialized() {
//         Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
//         loadModel();
//     })
// })

//--------------------------------------------------------------------------

//--------------------------------------------------------------------------
//Funkce pro načtení modelu do prohlížeče
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
    // var viewerDiv = document.getElementById('MyViewerDiv');
    // viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv);
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

function onLoadModelError(viewerErrorCode) {
    console.error('onLoadModelError() - errorCode:' + viewerErrorCode);
}

function loadModel() {
    // changeBackground();
    indexViewable = 0;
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
    // removeControls(viewer, 'toolbar-explodeTool');
    // addBtnContextMenu(viewer);
}
/**
 * viewer.loadModel() failure callback.
 * Invoked when there's an error fetching the SVF file.
 */
//--------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------
//Funkce pro získání property

//-----------------------------------------------------------------------------------

//Odebrání duplicit z pole
function eliminateDuplicates(arr) {
    var i,
        len = arr.length,
        out = [];
    obj = {};

    for (i = 0; i < len; i++) {
        obj[arr[i]] = 0;
    }
    for (i in obj) {
        out.push(i);
    }
    return out;
};

//Funkce pro tlačítko Home
getElById('btnHome').addEventListener('click',function(){
    window.location.href='/index.html'
})

//Funkce pro tlačítko Označit
getElById('btnSet').addEventListener('click', function () {
    getProperty(MyVars.viewer.getSelection(), "Číslo součásti");
    //Změna barvy součásti na červenou
    changePartColor(viewer, new THREE.Vector4(255, 0, 0, 1))

});

//Funkce pro tlačítko Přidat
getElById('btnGet').addEventListener('click', function () {

    tlacitka();
});

//Funkce pro tlačítko Vyčistit list
getElById('btnClearList').addEventListener('click', function () {
    listOfProperties = [];

    //Reset barev součástí na výchozí
    MyVars.viewer.clearThemingColors()

    //Vyčištění listu tlačítek jednotlivých součástí
    getElById('listGrSelect').innerHTML = createListGroup([], [])
});

//Funkce pro tlačítko Odeslat objednávku
getElById('btnSendRequest').addEventListener('click', function () {
    send();
    // window.close();
})


//Uspořádání těla emailu, rozdělení pole na jednotlivé řádky
function formatMailOrder() {
    var pole = eliminateDuplicates(listOfProperties);
    var out = "";
    var index = 0;
    // for(var i=0;i<listOfProperties;i++){
    //     index +=1;
    // };

    pole.forEach(element => {
        index += +1;
        out += index +". " + element + "%0A"
    });
    return "Tímto u Vás Objednávám náhradní součásti pro stroj/zařízení " + MyVars.fileName + ":" + "%0A" + out
}

//Funkce vygenerování emailu s objednávkou
function send() {
    setTimeout(function () {
        // window.open("mailto:" + document.getElementById('email').value + "?subject=" + document.getElementById('subject').value + "&body=" + document.getElementById('message').value);
        window.open("mailto:" + "michal.havel@cadstudio.cz" + "?subject=" + "Objednávka náhradních dílů" + "&body=" + formatMailOrder() + "%0A");
    }, 320);
}

//Vytvoření jednotlivých tláčítek (Skladová čísla položek)
function tlacitka() {
    getElById('listGrSelect').innerHTML = createListGroup(eliminateDuplicates(listOfProperties));
};

//Funkce na vytvoření tlačíka do seznam vybraných součástí
function createListGroup(properties) {
    var result = '';
    var hrefValue = '';
    for (var i = 0; i < properties.length; i++) {
        var value = "";
        value = properties[i];
        hrefValue = '"/PDF/'+properties[i]+'.pdf"';
        // <a href="#" class="list-group-item waves-light">Součást 1</a>
        //E:\GitHub\TestingForge\www\PDF\APF014-034.pdf
        result += '<a id =' + value + ' target="_blank" rel="no-opener no-referrer" href=' + hrefValue + ' class="list-group-item waves-light">' + value + '</a>';
    }
    console.log("Vytvořil jsem pole tlačítek...")
    return result;
}

//Získání požadované vlastnosti
function getProperty(selection, name) {
    callb();
    function callb() {
        for (var i = 0; i < selection.length; i++) {

           MyVars.viewer.model.getBulkProperties([selection[i]], name, function (prop) {
                var res = "";
                var propertyArray = prop[0].properties;
                for (var i = 0; i < propertyArray.length; i++) {
                    if (propertyArray[i].displayName == name) {
                        res = propertyArray[i].displayValue;
                        vysledekFunc(res);
                        console.log("Vnitrni funkce ok");
                    }
                }
            });
        };
    };
};

var listOfProperties = [];

//Vytvoření pole s požadovanou vlastností
function vysledekFunc(vys) {
    listOfProperties.push(vys);
    console.log(vys + " ziskano z vnejsi funkce");
    return listOfProperties;
};

//Změna barvy součásti
function changePartColor(viewer, colorRgb) {

    const selSet = MyVars.viewer.getSelection();
    MyVars.viewer.clearSelection();
    const color = colorRgb;
    for (let i = 0; i < selSet.length; i++) {
        MyVars.viewer.setThemingColor(selSet[i], color);
    }
}

//----------------------------------------------------------------------
//Funkce na změnu pozadí na jinou barvu
function changeBackground() {
    MyVars.viewer.setBackgroundColor(51, 51, 204, 255, 255, 255);
}
//----------------------------------------------------------------------

//Načtení extensions
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
    MyVars.viewer.loadExtension('_Viewing.Extension.ControlSelector');
}

function EventsTutorial() {
    MyVars.viewer.loadExtension('Autodesk.ADN.Viewing.Extension.EventWatcher.js');
} function loadControlSelector() {
    MyVars.viewer.loadExtension('_Viewing.Extension.ControlSelector');
}

function EventsTutorial() {
    MyVars.viewer.loadExtension('Autodesk.ADN.Viewing.Extension.EventWatcher.js');
}

function AutodeskViewingExtension() {
    MyVars.viewer.loadExtension('Autodesk.ADN.Viewing.Extension.js');
};

// $.getScript('js/extensions/Autodesk.ADN.Viewing.Extension.js',function(){

// })
