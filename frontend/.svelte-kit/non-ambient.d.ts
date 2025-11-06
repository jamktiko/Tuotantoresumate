
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/paasivu" | "/rekisteroidy" | "/reset";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/paasivu": Record<string, never>;
			"/rekisteroidy": Record<string, never>;
			"/reset": Record<string, never>
		};
		Pathname(): "/" | "/paasivu" | "/paasivu/" | "/rekisteroidy" | "/rekisteroidy/" | "/reset" | "/reset/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/kirjautumiskuva.jpg" | "/resumatelogo.png" | "/robots.txt" | string & {};
	}
}