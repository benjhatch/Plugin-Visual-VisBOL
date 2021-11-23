const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM();

global.window = dom.window;
global.document = window.document;
global.XMLSerializer = window.XMLSerializer;
global.navigator = window.navigator;
global.DOMParser = window.DOMParser;

const mxgraph = require("mxgraph")({
   mxImageBasePath: "./src/images",
   mxBasePath: "./src"
});

const { mxGraph, mxCodec, mxUtils, mxConstants, mxSVGCanvas2D } = mxgraph;

function makeOutput(xml) {
   const graph = new mxGraph();
   graph.home();

   const doc = mxUtils.parseXml(xml);
   const codec = new mxCodec(doc);
   codec.decode(doc.documentElement, graph.getModel());

   // The child of cell 1 that isn't a view cell points to the root view
   const cell1 = graph.getModel().getCell("1");
   let viewCells = graph.getModel().getChildren(cell1);
   let rootViewCell;
   if (viewCells) {
    for (let child of viewCells) {
      if (!child.isViewCell()) {
        rootViewCell = graph.getModel().getCell(child.getValue());
        graph.getModel().remove(child);
        break;
      }
    }
   }
   graph.enterGroup(rootViewCell);
   const viewStack = [];
   viewStack.push(rootViewCell);
   console.log(viewStack);
   /*
   this.selectionStack = [];

   let children = this.graph.getModel().getChildren(this.graph.getDefaultParent());
   if (children) {
     children.forEach(element => {
       if (element.isCircuitContainer())
         element.refreshCircuitContainer(this.graph);
     });
   }

   if (GraphBase.unFormatedCells.size > 0) {
     console.log("FORMATTING !!!!!!!!!!!!!!!!");
     this.autoFormat(GraphBase.unFormatedCells);
     GraphBase.unFormatedCells.clear();
   }

   // this.fitCamera();

   // this.metadataService.setComponentDefinitionMode(this.graph.getCurrentRoot().isComponentView());

   // top level compDefs may not have cells referencing them, but they still end up with view cells for other reasons
   // this.trimUnreferencedCells();

   graph.refresh(); // for some reason unformatted edges don't render correctly the first time without this

   var parent = graph.getDefaultParent();

   try {
      var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
      var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
      var e1 = graph.insertEdge(parent, null, '', v1, v2);
    } catch(error) {
       console.log(`error: ${error}`)
    }
    return graph;
    */
}

const testXML = `<mxGraphModel><root><mxCell id="0"><Array as="value"><Array><GlyphInfo as="https://sbolcanvas.org/id74" displayID="id74" partRole="Pro (Promoter)" partType="DNA region" uriPrefix="https://sbolcanvas.org"><Array as="otherTypes"/><Array as="otherRoles"/><Array as="annotations"/></GlyphInfo><GlyphInfo as="https://sbolcanvas.org/id72" displayID="id72" partRole="NGA (No Glyph Assigned)" partType="DNA region" uriPrefix="https://sbolcanvas.org"><Array as="otherTypes"/><Array as="otherRoles"/><Array as="annotations"/></GlyphInfo><GlyphInfo as="https://sbolcanvas.org/id70" displayID="id70" partRole="NGA (No Glyph Assigned)" partType="DNA region" uriPrefix="https://sbolcanvas.org"><Array as="otherTypes"/><Array as="otherRoles"/><Array as="annotations"/></GlyphInfo><ModuleInfo as="https://sbolcanvas.org/module1/1" displayID="module1" uriPrefix="https://sbolcanvas.org" version="1"/><GlyphInfo as="https://sbolcanvas.org/id77" displayID="id77" partRole="Pro (Promoter)" partType="DNA region" uriPrefix="https://sbolcanvas.org"><Array as="otherTypes"/><Array as="otherRoles"/><Array as="annotations"/></GlyphInfo></Array><Array/><Array><InteractionInfo as="https://sbolcanvas.org/module1/Interaction27" displayID="Interaction27" interactionType="Control" uriPrefix="https://sbolcanvas.org/module1"/></Array></Array></mxCell><mxCell id="1" parent="0"/><mxCell id="2" parent="1" value="https://sbolcanvas.org/module1/1" vertex="1"><mxGeometry as="geometry"/></mxCell><mxCell id="https://sbolcanvas.org/module1/1" parent="1" style="moduleViewCell" vertex="1"><mxGeometry as="geometry"/></mxCell><mxCell edge="1" id="9" parent="https://sbolcanvas.org/module1/1" source="5" style="interactionGlyph" target="8" value="https://sbolcanvas.org/module1/Interaction27"><mxGeometry as="geometry"><mxPoint as="sourcePoint" x="190.0" y="370.0"/><mxPoint as="targetPoint" x="270.0" y="290.0"/><Array as="points"/></mxGeometry></mxCell><mxCell id="6" parent="https://sbolcanvas.org/module1/1" style="circuitContainer" value="https://sbolcanvas.org/id70" vertex="1"><mxGeometry as="geometry" height="100.0" width="50.0" x="350.0" y="240.0"/></mxCell><mxCell id="8" parent="6" style="sequenceFeatureGlyph" value="https://sbolcanvas.org/id77" vertex="1"><mxGeometry as="geometry" height="100.0" width="50.0"/></mxCell><mxCell id="7" parent="6" style="backbone" vertex="1"><mxGeometry as="geometry"/></mxCell><mxCell id="3" parent="https://sbolcanvas.org/module1/1" style="circuitContainer" value="https://sbolcanvas.org/id72" vertex="1"><mxGeometry as="geometry" height="100.0" width="50.0" x="130.0" y="430.0"/></mxCell><mxCell id="5" parent="3" style="sequenceFeatureGlyph" value="https://sbolcanvas.org/id74" vertex="1"><mxGeometry as="geometry" height="100.0" width="50.0"/></mxCell><mxCell id="4" parent="3" style="backbone" vertex="1"><mxGeometry as="geometry"/></mxCell><mxCell id="https://sbolcanvas.org/id72" parent="1" style="componentViewCell" vertex="1"><mxGeometry as="geometry"/></mxCell><mxCell id="10" parent="https://sbolcanvas.org/id72" style="circuitContainer" value="https://sbolcanvas.org/id72" vertex="1"><mxGeometry as="geometry" height="100.0" width="50.0" x="130.0" y="430.0"/></mxCell><mxCell id="12" parent="10" style="sequenceFeatureGlyph" value="https://sbolcanvas.org/id74" vertex="1"><mxGeometry as="geometry" height="100.0" width="50.0"/></mxCell><mxCell id="11" parent="10" style="backbone" vertex="1"><mxGeometry as="geometry" height="1.0" width="50.0" y="50.0"/></mxCell><mxCell id="https://sbolcanvas.org/id77" parent="1" style="componentViewCell" vertex="1"><mxGeometry as="geometry"/></mxCell><mxCell id="13" parent="https://sbolcanvas.org/id77" style="circuitContainer" value="https://sbolcanvas.org/id77" vertex="1"><mxGeometry as="geometry"/></mxCell><mxCell id="14" parent="13" style="backbone" vertex="1"><mxGeometry as="geometry"/></mxCell><mxCell id="https://sbolcanvas.org/id70" parent="1" style="componentViewCell" vertex="1"><mxGeometry as="geometry"/></mxCell><mxCell id="15" parent="https://sbolcanvas.org/id70" style="circuitContainer" value="https://sbolcanvas.org/id70" vertex="1"><mxGeometry as="geometry" height="100.0" width="50.0" x="350.0" y="240.0"/></mxCell><mxCell id="17" parent="15" style="sequenceFeatureGlyph" value="https://sbolcanvas.org/id77" vertex="1"><mxGeometry as="geometry" height="100.0" width="50.0"/></mxCell><mxCell id="16" parent="15" style="backbone" vertex="1"><mxGeometry as="geometry" height="1.0" width="50.0" y="50.0"/></mxCell><mxCell id="https://sbolcanvas.org/id74" parent="1" style="componentViewCell" vertex="1"><mxGeometry as="geometry"/></mxCell><mxCell id="18" parent="https://sbolcanvas.org/id74" style="circuitContainer" value="https://sbolcanvas.org/id74" vertex="1"><mxGeometry as="geometry"/></mxCell><mxCell id="19" parent="18" style="backbone" vertex="1"><mxGeometry as="geometry"/></mxCell></root></mxGraphModel>`;
// console.log(encodeURIComponent(testXML));
makeHelloWorld(testXML);