import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md px-6">
        <div className="flex justify-center gap-1 mb-6">
          <span className="w-3 h-3 rounded-full bg-[#1E3A5F]" />
          <span className="w-3 h-3 rounded-full bg-[#C75B39]" />
          <span className="w-3 h-3 rounded-full bg-[#C69C3F]" />
          <span className="w-3 h-3 rounded-full bg-[#5B8A72]" />
        </div>
        <h1 className="text-6xl font-medium text-foreground mb-3">404</h1>
        <p className="text-muted-foreground mb-8">
          This page doesn't exist. You may have followed an old link or typed the address incorrectly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="inline-flex items-center justify-center rounded-full bg-[#1E3A5F] hover:bg-[#2B5278] text-white text-sm h-10 px-6 transition-colors">
            Go home
          </Link>
          <Link href="/apply" className="inline-flex items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-gray-50 text-sm h-10 px-6 transition-colors">
            Apply for help
          </Link>
          <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-gray-50 text-sm h-10 px-6 transition-colors">
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
