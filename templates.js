import serialize from "serialize-javascript";

// returning the visbol rendering
export const createRendering = (properties, hostAddress) => {
   const content =
   `
   <script type="text/javascript">window.__INITIAL_DATA__ = ${serialize(properties)}</script>
   <script type="text/javascript" src="http://${hostAddress}/visbol.js" charset="utf-8"></script>
   `;

   return populateTemplate(content);
};

// returning an error
export const createError = (error) => {
   const content =
   `
   Error while parsing the file for VisBOL rendering:
   ${error}
   `;

   return populateTemplate(content);
}

// template html to send
const populateTemplate = content =>
`
<!doctype html>
<html>
   <head><title>VisBOL</title></head>
   <body>
      <div id="plugin-visual-visbol">
      ${content}
      </div>
   </body>
</html>
`;