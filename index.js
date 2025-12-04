import { join } from "path";

const comments = [
  {
    id: "f702cd8f-06e3-45f9-ac18-f26f78e9a2a7",
    repliedToId: null,
    topParentId: null,
    task: null,
    user: {
      type: "user",
      id: "1ae0ba07-6f5a-4ad2-8e84-50fb221b2f54",
      email: "zolotarov@brights.io",
      firstName: "Ilya",
      lastName: "Zolotarov",
      me: true,
    },
    isExternal: false,
    priority: false,
    text: "No annotations comment",
    documentPage: 6,
    annotations: null,
    createdAt: "2025-12-04T12:10:29.761Z",
  },
  {
    id: "fc9e3c56-c060-4190-9563-2092b07cae77",
    repliedToId: null,
    topParentId: null,
    task: null,
    user: {
      type: "user",
      id: "1ae0ba07-6f5a-4ad2-8e84-50fb221b2f54",
      email: "zolotarov@brights.io",
      firstName: "Ilya",
      lastName: "Zolotarov",
      me: true,
    },
    isExternal: false,
    priority: false,
    text: "Red rectangles comment",
    documentPage: 5,
    annotations:
      '[{"type":"rect","left":0.07088520055325034,"top":0.066015625,"originX":"left","originY":"top","width":0.6997233748271093,"height":0.073193359375,"stroke":"#F75248"},{"type":"rect","left":0.060650069156293215,"top":0.235400390625,"originX":"left","originY":"top","width":0.8197095435684647,"height":0.07177734375,"stroke":"#F75248"}]',
    createdAt: "2025-12-04T12:07:31.329Z",
  },
  {
    id: "e7af32c1-aba0-4ff9-887e-5a7bc004fd11",
    repliedToId: null,
    topParentId: null,
    task: null,
    user: {
      type: "user",
      id: "1ae0ba07-6f5a-4ad2-8e84-50fb221b2f54",
      email: "zolotarov@brights.io",
      firstName: "Ilya",
      lastName: "Zolotarov",
      me: true,
    },
    isExternal: false,
    priority: false,
    text: "Lines comment",
    documentPage: 3,
    annotations:
      '[{"type":"line","left":0.42067773167358224,"top":0.12919921875,"originX":"center","originY":"center","width":0.6915629322268326,"height":0,"x1":-0.34578146611341626,"x2":0.34578146611341626,"y1":0,"y2":0,"stroke":"#58c97a"},{"type":"line","left":0.3810511756569848,"top":0.37109375,"originX":"center","originY":"center","width":0.6407330567081605,"height":0.001416015625,"x1":-0.3203563583109592,"x2":0.3203563583109592,"y1":0.0007177384013474369,"y2":-0.0007177384013474369,"stroke":"#58c97a"},{"type":"line","left":0.46141078838174276,"top":0.29716796875,"originX":"center","originY":"center","width":0.7892116182572615,"height":0.0028808593749999997,"x1":-0.39459767309413385,"x2":0.39459767309413385,"y1":-0.0014354768026948565,"y2":0.0014354768026948565,"stroke":"#58c97a"}]',
    createdAt: "2025-12-04T12:04:58.341Z",
  },
  {
    id: "83d14f89-8e80-4aa1-a09e-1880182f72f5",
    repliedToId: null,
    topParentId: null,
    task: null,
    user: {
      type: "user",
      id: "1ae0ba07-6f5a-4ad2-8e84-50fb221b2f54",
      email: "zolotarov@brights.io",
      firstName: "Ilya",
      lastName: "Zolotarov",
      me: true,
    },
    isExternal: false,
    priority: false,
    text: "Ellipses comment",
    documentPage: 2,
    annotations:
      '[{"type":"ellipse","left":0.06680497925311203,"top":0.045947265625,"originX":"left","originY":"top","width":0.6691562932226833,"height":0.11484375,"stroke":"#58c97a"},{"type":"ellipse","left":0.04847856154910096,"top":0.653125,"originX":"left","originY":"top","width":0.8746196403872752,"height":0.235400390625,"stroke":"#58c97a"}]',
    createdAt: "2025-12-04T12:04:20.365Z",
  },
  {
    id: "87434a6e-4aaf-49a2-8827-2fe6f173aefe",
    repliedToId: null,
    topParentId: null,
    task: null,
    user: {
      type: "user",
      id: "1ae0ba07-6f5a-4ad2-8e84-50fb221b2f54",
      email: "zolotarov@brights.io",
      firstName: "Ilya",
      lastName: "Zolotarov",
      me: true,
    },
    isExternal: false,
    priority: false,
    text: "Rectangle comment",
    documentPage: 1,
    annotations:
      '[{"type":"rect","left":0.15629322268326418,"top":0.132080078125,"originX":"left","originY":"top","width":0.38236514522821574,"height":0.111962890625,"stroke":"#58c97a"}]',
    createdAt: "2025-12-04T12:03:38.315Z"
  },
];

const documentPath = join(process.cwd(), "data", "500mb.pdf");
const outputPath = join(process.cwd(), "data", "annotated-document.pdf");


await (async function main() {
  // TODO: implement
  console.log(`Saved annotated PDF to ${outputPath}`);
})();
