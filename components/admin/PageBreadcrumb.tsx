"use client";

import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface PageBreadcrumbProps {
  title: string;
  name?: string;
  children?: ReactNode;
  breadCrumbItems?: {
    label: string;
    href?: string;
  }[];
}

const PageBreadcrumb = ({
  title,
  name,
  children,
  breadCrumbItems = [],
}: PageBreadcrumbProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      {name && (
        <div className="flex justify-between items-center mb-6">
          {/* Left Side: Page Title */}
          <div className="flex gap-3">
            <h4 className="text-slate-900 dark:text-slate-200 text-lg font-medium">
              {name}
            </h4>
            {children}
          </div>

          {/* Right Side: Breadcrumb */}
          <Breadcrumb>
            <BreadcrumbList>
              {breadCrumbItems.map((item, idx) => (
                <BreadcrumbItem key={idx}>
                  {item.href ? (
                    <BreadcrumbLink asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}

                  {idx < breadCrumbItems.length - 1 && (
                    <BreadcrumbSeparator>
                      <ChevronRight size={16} strokeWidth={1.5} />
                    </BreadcrumbSeparator>
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      )}
    </>
  );
};

export default PageBreadcrumb;
