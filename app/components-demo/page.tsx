"use client";

import React, { useState, useMemo } from "react";
import { Search, Menu, ChevronRight } from "lucide-react";
import { demoData } from "./demo-data";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Get component names and sort alphabetically
const componentKeys = Object.keys(demoData).sort();

export default function ComponentsDocsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeComponentKey, setActiveComponentKey] = useState<string>(componentKeys[0] || "");
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    const filteredComponents = useMemo(() => {
        return componentKeys.filter((key) =>
            key.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    const activeComponent = activeComponentKey ? demoData[activeComponentKey] : null;

    const NavContent = () => (
        <div className="flex flex-col h-full bg-[#1A202C] text-[#F9FAFB]">
            <div className="p-4 flex items-center gap-2 font-semibold text-lg border-b border-gray-700">
                <span className="bg-blue-500 rounded-md w-6 h-6 flex items-center justify-center text-white text-xs">A</span>
                UI Library
            </div>

            <div className="p-4">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search components..."
                        className="pl-9 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus-visible:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <ScrollArea className="flex-1 px-3 pb-4">
                <div className="space-y-1">
                    {filteredComponents.length > 0 ? (
                        filteredComponents.map((key) => (
                            <button
                                key={key}
                                onClick={() => {
                                    setActiveComponentKey(key);
                                    setIsMobileNavOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${activeComponentKey === key
                                    ? "bg-[#60A5FA]/20 text-[#60A5FA] font-medium"
                                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                    }`}
                            >
                                {demoData[key]?.name || key}
                            </button>
                        ))
                    ) : (
                        <p className="px-3 py-2 text-sm text-gray-500">No components found.</p>
                    )}
                </div>
            </ScrollArea>
        </div>
    );

    return (
        <div className="flex min-h-screen w-full bg-[#F3F4F6]">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50">
                <NavContent />
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
                {/* Mobile Header */}
                <header className="md:hidden flex h-14 items-center gap-4 border-b bg-white px-4">
                    <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="shrink-0 -ml-2">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 border-r-0 w-72 bg-[#1A202C]">
                            <NavContent />
                        </SheetContent>
                    </Sheet>
                    <div className="font-semibold text-lg flex items-center gap-2">
                        <span className="bg-[#1A202C] rounded-md w-6 h-6 flex items-center justify-center text-white text-xs">A</span>
                        Docs
                    </div>
                </header>

                {/* Component Content */}
                {activeComponent ? (
                    <div className="flex-1 p-6 md:p-10 max-w-5xl">
                        {/* Breadcrumbs */}
                        <Breadcrumb className="mb-6">
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="#" className="flex items-center text-gray-500 hover:text-gray-900">
                                        Docs
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="#" className="flex items-center text-gray-500 hover:text-gray-900">
                                        Components
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="font-medium text-gray-900">{activeComponent.name}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>

                        {/* Header */}
                        <div className="mb-10 space-y-4">
                            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-gray-900">
                                {activeComponent.name}
                            </h1>
                            <p className="text-xl text-gray-500">
                                {activeComponent.description}
                            </p>
                        </div>

                        <Separator className="my-10 bg-gray-200" />

                        <div className="space-y-10">
                            {/* Preview Section */}
                            <section>
                                <h3 className="text-xl font-semibold mb-4 text-gray-900">Preview</h3>
                                <div className="min-h-[250px] w-full rounded-xl border border-gray-200 bg-white p-6 md:p-10 flex items-center justify-center">
                                    {/* Container ensures items are centered nicely by default, but components can override via classes */}
                                    <div className="w-full max-w-3xl flex justify-center items-center">
                                        {activeComponent.preview}
                                    </div>
                                </div>
                            </section>

                            {/* Code Snippet Section */}
                            <section>
                                <h3 className="text-xl font-semibold mb-4 text-gray-900">Code</h3>
                                <div className="rounded-xl overflow-hidden bg-[#0d1117] border border-gray-800 relative">
                                    <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-gray-800">
                                        <span className="text-xs text-gray-400 font-mono">example.tsx</span>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 text-xs text-gray-400 hover:text-white"
                                            onClick={() => navigator.clipboard.writeText(activeComponent.code)}
                                        >
                                            Copy
                                        </Button>
                                    </div>
                                    <ScrollArea className="max-h-[500px]">
                                        <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto leading-relaxed">
                                            <code>{activeComponent.code}</code>
                                        </pre>
                                    </ScrollArea>
                                </div>
                            </section>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 p-6 md:p-10 flex items-center justify-center text-gray-500 h-full">
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-semibold text-gray-700">No Component Selected</h2>
                            <p>Please select a component from the sidebar to view its documentation.</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
