import Checklist from "@site/src/components/Checklist";
import { useState } from "react";

export default function ChecklistColorDemo() {
  const [color, setColor] = useState("#800080"); // default purple
  return (
    <div>
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ marginBottom: "1rem" }} />
      <Checklist checklistId="id-verification-demo" title="ID & Selfie Verification" borderColor={color}>
        <Checklist.Item id="demo-item">Demo checklist item with dynamic color!</Checklist.Item>
        <Checklist.Item id="demo-item-2">Another dynamic checklist item.</Checklist.Item>
      </Checklist>
    </div>
  );
}
