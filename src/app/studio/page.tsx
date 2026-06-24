"use client";

import Header from "@/components/ui/header";
import PreviewPane from "@/components/studio/preview-pane";
import ControlPanel from "@/components/studio/control-panel";
import Timeline from "@/components/studio/timeline";

export default function StudioPage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col pt-16">
        <div className="flex flex-1 flex-col gap-4 p-4 lg:flex-row">
          <PreviewPane />
          <ControlPanel />
        </div>
        <div className="px-4 pb-4">
          <Timeline />
        </div>
      </main>
    </>
  );
}
