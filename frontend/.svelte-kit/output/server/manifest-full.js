export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["kirjautumiskuva.jpg","resumatelogo.png","robots.txt"]),
	mimeTypes: {".jpg":"image/jpeg",".png":"image/png",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.CYpy6hf1.js",app:"_app/immutable/entry/app.BhFkRROZ.js",imports:["_app/immutable/entry/start.CYpy6hf1.js","_app/immutable/chunks/DSeZd1EQ.js","_app/immutable/chunks/DLvRxPYn.js","_app/immutable/chunks/BM4aws82.js","_app/immutable/chunks/pnuHE1ME.js","_app/immutable/chunks/BBf2YSF3.js","_app/immutable/chunks/ClWfC-3T.js","_app/immutable/chunks/B52NjPIL.js","_app/immutable/entry/app.BhFkRROZ.js","_app/immutable/chunks/BM4aws82.js","_app/immutable/chunks/pnuHE1ME.js","_app/immutable/chunks/BBf2YSF3.js","_app/immutable/chunks/ClWfC-3T.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/DLvRxPYn.js","_app/immutable/chunks/B52NjPIL.js","_app/immutable/chunks/cr2CvWk8.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/paasivu",
				pattern: /^\/paasivu\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/rekisteroidy",
				pattern: /^\/rekisteroidy\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/reset",
				pattern: /^\/reset\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
