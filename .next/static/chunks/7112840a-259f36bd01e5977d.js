"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[16],{19:function(e,t,n){n.d(t,{ET:function(){return rU},JU:function(){return s2},ad:function(){return rs},cf:function(){return rP},hJ:function(){return s1},oe:function(){return rO},r7:function(){return rM}});var s,r,i=n(5816),a=n(8463),o=n(3333),l=n(4444),u=n(3510);n(3454);let h="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}c.UNAUTHENTICATED=new c(null),c.GOOGLE_CREDENTIALS=new c("google-credentials-uid"),c.FIRST_PARTY=new c("first-party-uid"),c.MOCK_USER=new c("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let d="9.16.0",f=new o.Yd("@firebase/firestore");function m(){return f.logLevel}function g(e,...t){if(f.logLevel<=o.in.DEBUG){let n=t.map(w);f.debug(`Firestore (${d}): ${e}`,...n)}}function p(e,...t){if(f.logLevel<=o.in.ERROR){let n=t.map(w);f.error(`Firestore (${d}): ${e}`,...n)}}function y(e,...t){if(f.logLevel<=o.in.WARN){let n=t.map(w);f.warn(`Firestore (${d}): ${e}`,...n)}}function w(e){if("string"==typeof e)return e;try{return JSON.stringify(e)}catch(t){return e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function v(e="Unexpected state"){let t=`FIRESTORE (${d}) INTERNAL ASSERTION FAILED: `+e;throw p(t),Error(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let E={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class T extends l.ZR{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class I{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class S{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(c.UNAUTHENTICATED))}shutdown(){}}class k{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class A{constructor(e){this.t=e,this.currentUser=c.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let n=this.i,s=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve(),r=new I;this.o=()=>{this.i++,this.currentUser=this.u(),r.resolve(),r=new I,e.enqueueRetryable(()=>s(this.currentUser))};let i=()=>{let t=r;e.enqueueRetryable(async()=>{await t.promise,await s(this.currentUser)})},a=e=>{g("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=e,this.auth.addAuthTokenListener(this.o),i()};this.t.onInit(e=>a(e)),setTimeout(()=>{if(!this.auth){let e=this.t.getImmediate({optional:!0});e?a(e):(g("FirebaseAuthCredentialsProvider","Auth not yet detected"),r.resolve(),r=new I)}},0),i()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(t=>this.i!==e?(g("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?("string"==typeof t.accessToken||v(),new C(t.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){let e=this.auth&&this.auth.getUid();return null===e||"string"==typeof e||v(),new c(e)}}class _{constructor(e,t,n,s){this.h=e,this.l=t,this.m=n,this.g=s,this.type="FirstParty",this.user=c.FIRST_PARTY,this.p=new Map}I(){return this.g?this.g():("object"==typeof this.h&&null!==this.h&&this.h.auth&&this.h.auth.getAuthHeaderValueForFirstParty||v(),this.h.auth.getAuthHeaderValueForFirstParty([]))}get headers(){this.p.set("X-Goog-AuthUser",this.l);let e=this.I();return e&&this.p.set("Authorization",e),this.m&&this.p.set("X-Goog-Iam-Authorization-Token",this.m),this.p}}class N{constructor(e,t,n,s){this.h=e,this.l=t,this.m=n,this.g=s}getToken(){return Promise.resolve(new _(this.h,this.l,this.m,this.g))}start(e,t){e.enqueueRetryable(()=>t(c.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class b{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class D{constructor(e){this.T=e,this.forceRefresh=!1,this.appCheck=null,this.A=null}start(e,t){let n=e=>{null!=e.error&&g("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`);let n=e.token!==this.A;return this.A=e.token,g("FirebaseAppCheckTokenProvider",`Received ${n?"new":"existing"} token.`),n?t(e.token):Promise.resolve()};this.o=t=>{e.enqueueRetryable(()=>n(t))};let s=e=>{g("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=e,this.appCheck.addTokenListener(this.o)};this.T.onInit(e=>s(e)),setTimeout(()=>{if(!this.appCheck){let e=this.T.getImmediate({optional:!0});e?s(e):g("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(e=>e?("string"==typeof e.token||v(),this.A=e.token,new b(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R{static R(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length,n="";for(;n.length<20;){let s=/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){let t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let t=0;t<e;t++)n[t]=Math.floor(256*Math.random());return n}(40);for(let r=0;r<s.length;++r)n.length<20&&s[r]<t&&(n+=e.charAt(s[r]%e.length))}return n}}function L(e,t){return e<t?-1:e>t?1:0}function x(e,t,n){return e.length===t.length&&e.every((e,s)=>n(e,t[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0||t>=1e9)throw new T(E.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800||e>=253402300800)throw new T(E.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return V.fromMillis(Date.now())}static fromDate(e){return V.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3);return new V(t,Math.floor(1e6*(e-1e3*t)))}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?L(this.nanoseconds,e.nanoseconds):L(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){let e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{constructor(e){this.timestamp=e}static fromTimestamp(e){return new F(e)}static min(){return new F(new V(0,0))}static max(){return new F(new V(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e,t,n){void 0===t?t=0:t>e.length&&v(),void 0===n?n=e.length-t:n>e.length-t&&v(),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===M.comparator(this,e)}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof M?e.forEach(e=>{t.push(e)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let n=Math.min(e.length,t.length);for(let s=0;s<n;s++){let n=e.get(s),r=t.get(s);if(n<r)return -1;if(n>r)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class O extends M{construct(e,t,n){return new O(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){let t=[];for(let n of e){if(n.indexOf("//")>=0)throw new T(E.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(e=>e.length>0))}return new O(t)}static emptyPath(){return new O([])}}let U=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class P extends M{construct(e,t,n){return new P(e,t,n)}static isValidIdentifier(e){return U.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),P.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new P(["__name__"])}static fromServerFormat(e){let t=[],n="",s=0,r=()=>{if(0===n.length)throw new T(E.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""},i=!1;for(;s<e.length;){let t=e[s];if("\\"===t){if(s+1===e.length)throw new T(E.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let t=e[s+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new T(E.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,s+=2}else"`"===t?(i=!i,s++):"."!==t||i?(n+=t,s++):(r(),s++)}if(r(),i)throw new T(E.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new P(t)}static emptyPath(){return new P([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q{constructor(e){this.path=e}static fromPath(e){return new q(O.fromString(e))}static fromName(e){return new q(O.fromString(e).popFirst(5))}static empty(){return new q(O.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return null!==e&&0===O.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return O.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new q(new O(e.slice()))}}class B{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new B(F.min(),q.empty(),-1)}static max(){return new B(F.max(),q.empty(),-1)}}class K{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Q(e){if(e.code!==E.FAILED_PRECONDITION||"The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab."!==e.message)throw e;g("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&v(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new z((n,s)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,s)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof z?t:z.resolve(t)}catch(e){return z.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):z.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):z.reject(t)}static resolve(e){return new z((t,n)=>{t(e)})}static reject(e){return new z((t,n)=>{n(e)})}static waitFor(e){return new z((t,n)=>{let s=0,r=0,i=!1;e.forEach(e=>{++s,e.next(()=>{++r,i&&r===s&&t()},e=>n(e))}),i=!0,r===s&&t()})}static or(e){let t=z.resolve(!1);for(let n of e)t=t.next(e=>e?z.resolve(e):n());return t}static forEach(e,t){let n=[];return e.forEach((e,s)=>{n.push(t.call(this,e,s))}),this.waitFor(n)}static mapArray(e,t){return new z((n,s)=>{let r=e.length,i=Array(r),a=0;for(let o=0;o<r;o++){let l=o;t(e[l]).next(e=>{i[l]=e,++a===r&&n(i)},e=>s(e))}})}static doWhile(e,t){return new z((n,s)=>{let r=()=>{!0===e()?t().next(()=>{r()},s):n()};r()})}}function G(e){return"IndexedDbTransactionError"===e.name}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.ut(e),this.ct=e=>t.writeSequenceNumber(e))}ut(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.ct&&this.ct(e),e}}$.at=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(e,t,n,s,r,i,a,o){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=s,this.ssl=r,this.forceLongPolling=i,this.autoDetectLongPolling=a,this.useFetchStreams=o}}class W{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new W("","")}get isDefaultDatabase(){return"(default)"===this.database}isEqual(e){return e instanceof W&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function H(e){let t=0;for(let n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function Y(e,t){for(let n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function X(e){for(let t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function J(e){return 0===e&&1/e==-1/0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(e){this.binaryString=e}static fromBase64String(e){let t=atob(e);return new Z(t)}static fromUint8Array(e){let t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new Z(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return btoa(this.binaryString)}toUint8Array(){return function(e){let t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return L(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Z.EMPTY_BYTE_STRING=new Z("");let ee=RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function et(e){if(e||v(),"string"==typeof e){let t=0,n=ee.exec(e);if(n||v(),n[1]){let e=n[1];t=Number(e=(e+"000000000").substr(0,9))}let s=new Date(e);return{seconds:Math.floor(s.getTime()/1e3),nanos:t}}return{seconds:en(e.seconds),nanos:en(e.nanos)}}function en(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function es(e){return"string"==typeof e?Z.fromBase64String(e):Z.fromUint8Array(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function er(e){var t,n;return"server_timestamp"===(null===(n=((null===(t=null==e?void 0:e.mapValue)||void 0===t?void 0:t.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function ei(e){let t=et(e.mapValue.fields.__local_write_time__.timestampValue);return new V(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ea={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function eo(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?er(e)?4:ev(e)?9007199254740991:10:v()}function el(e,t){if(e===t)return!0;let n=eo(e);if(n!==eo(t))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return ei(e).isEqual(ei(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;let n=et(e.timestampValue),s=et(t.timestampValue);return n.seconds===s.seconds&&n.nanos===s.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return es(e.bytesValue).isEqual(es(t.bytesValue));case 7:return e.referenceValue===t.referenceValue;case 8:return en(e.geoPointValue.latitude)===en(t.geoPointValue.latitude)&&en(e.geoPointValue.longitude)===en(t.geoPointValue.longitude);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return en(e.integerValue)===en(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){let n=en(e.doubleValue),s=en(t.doubleValue);return n===s?J(n)===J(s):isNaN(n)&&isNaN(s)}return!1}(e,t);case 9:return x(e.arrayValue.values||[],t.arrayValue.values||[],el);case 10:return function(e,t){let n=e.mapValue.fields||{},s=t.mapValue.fields||{};if(H(n)!==H(s))return!1;for(let e in n)if(n.hasOwnProperty(e)&&(void 0===s[e]||!el(n[e],s[e])))return!1;return!0}(e,t);default:return v()}}function eu(e,t){return void 0!==(e.values||[]).find(e=>el(e,t))}function eh(e,t){if(e===t)return 0;let n=eo(e),s=eo(t);if(n!==s)return L(n,s);switch(n){case 0:case 9007199254740991:return 0;case 1:return L(e.booleanValue,t.booleanValue);case 2:return function(e,t){let n=en(e.integerValue||e.doubleValue),s=en(t.integerValue||t.doubleValue);return n<s?-1:n>s?1:n===s?0:isNaN(n)?isNaN(s)?0:-1:1}(e,t);case 3:return ec(e.timestampValue,t.timestampValue);case 4:return ec(ei(e),ei(t));case 5:return L(e.stringValue,t.stringValue);case 6:return function(e,t){let n=es(e),s=es(t);return n.compareTo(s)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){let n=e.split("/"),s=t.split("/");for(let e=0;e<n.length&&e<s.length;e++){let t=L(n[e],s[e]);if(0!==t)return t}return L(n.length,s.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){let n=L(en(e.latitude),en(t.latitude));return 0!==n?n:L(en(e.longitude),en(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return function(e,t){let n=e.values||[],s=t.values||[];for(let e=0;e<n.length&&e<s.length;++e){let t=eh(n[e],s[e]);if(t)return t}return L(n.length,s.length)}(e.arrayValue,t.arrayValue);case 10:return function(e,t){if(e===ea.mapValue&&t===ea.mapValue)return 0;if(e===ea.mapValue)return 1;if(t===ea.mapValue)return -1;let n=e.fields||{},s=Object.keys(n),r=t.fields||{},i=Object.keys(r);s.sort(),i.sort();for(let e=0;e<s.length&&e<i.length;++e){let t=L(s[e],i[e]);if(0!==t)return t;let a=eh(n[s[e]],r[i[e]]);if(0!==a)return a}return L(s.length,i.length)}(e.mapValue,t.mapValue);default:throw v()}}function ec(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return L(e,t);let n=et(e),s=et(t),r=L(n.seconds,s.seconds);return 0!==r?r:L(n.nanos,s.nanos)}function ed(e){var t,n;return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){let t=et(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?es(e.bytesValue).toBase64():"referenceValue"in e?(n=e.referenceValue,q.fromName(n).toString()):"geoPointValue"in e?`geo(${(t=e.geoPointValue).latitude},${t.longitude})`:"arrayValue"in e?function(e){let t="[",n=!0;for(let s of e.values||[])n?n=!1:t+=",",t+=ed(s);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){let t=Object.keys(e.fields||{}).sort(),n="{",s=!0;for(let r of t)s?s=!1:n+=",",n+=`${r}:${ed(e.fields[r])}`;return n+"}"}(e.mapValue):v()}function ef(e){return!!e&&"integerValue"in e}function em(e){return!!e&&"arrayValue"in e}function eg(e){return!!e&&"nullValue"in e}function ep(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function ey(e){return!!e&&"mapValue"in e}function ew(e){if(e.geoPointValue)return{geoPointValue:Object.assign({},e.geoPointValue)};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:Object.assign({},e.timestampValue)};if(e.mapValue){let t={mapValue:{fields:{}}};return Y(e.mapValue.fields,(e,n)=>t.mapValue.fields[e]=ew(n)),t}if(e.arrayValue){let t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=ew(e.arrayValue.values[n]);return t}return Object.assign({},e)}function ev(e){return"__max__"===(((e.mapValue||{}).fields||{}).__type__||{}).stringValue}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eE{constructor(e,t){this.position=e,this.inclusive=t}}function eT(e,t,n){let s=0;for(let r=0;r<e.position.length;r++){let i=t[r],a=e.position[r];if(s=i.field.isKeyField()?q.comparator(q.fromName(a.referenceValue),n.key):eh(a,n.data.field(i.field)),"desc"===i.dir&&(s*=-1),0!==s)break}return s}function eI(e,t){if(null===e)return null===t;if(null===t||e.inclusive!==t.inclusive||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!el(e.position[n],t.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eC{}class eS extends eC{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.createKeyFieldInFilter(e,t,n):new eN(e,t,n):"array-contains"===t?new eL(e,n):"in"===t?new ex(e,n):"not-in"===t?new eV(e,n):"array-contains-any"===t?new eF(e,n):new eS(e,t,n)}static createKeyFieldInFilter(e,t,n){return"in"===t?new eb(e,n):new eD(e,n)}matches(e){let t=e.data.field(this.field);return"!="===this.op?null!==t&&this.matchesComparison(eh(t,this.value)):null!==t&&eo(this.value)===eo(t)&&this.matchesComparison(eh(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return v()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}getFirstInequalityField(){return this.isInequality()?this.field:null}}class ek extends eC{constructor(e,t){super(),this.filters=e,this.op=t,this.ht=null}static create(e,t){return new ek(e,t)}matches(e){return eA(this)?void 0===this.filters.find(t=>!t.matches(e)):void 0!==this.filters.find(t=>t.matches(e))}getFlattenedFilters(){return null!==this.ht||(this.ht=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ht}getFilters(){return Object.assign([],this.filters)}getFirstInequalityField(){let e=this.lt(e=>e.isInequality());return null!==e?e.field:null}lt(e){for(let t of this.getFlattenedFilters())if(e(t))return t;return null}}function eA(e){return"and"===e.op}function e_(e){for(let t of e.filters)if(t instanceof ek)return!1;return!0}class eN extends eS{constructor(e,t,n){super(e,t,n),this.key=q.fromName(n.referenceValue)}matches(e){let t=q.comparator(e.key,this.key);return this.matchesComparison(t)}}class eb extends eS{constructor(e,t){super(e,"in",t),this.keys=eR("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class eD extends eS{constructor(e,t){super(e,"not-in",t),this.keys=eR("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function eR(e,t){var n;return((null===(n=t.arrayValue)||void 0===n?void 0:n.values)||[]).map(e=>q.fromName(e.referenceValue))}class eL extends eS{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return em(t)&&eu(t.arrayValue,this.value)}}class ex extends eS{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return null!==t&&eu(this.value.arrayValue,t)}}class eV extends eS{constructor(e,t){super(e,"not-in",t)}matches(e){if(eu(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return null!==t&&!eu(this.value.arrayValue,t)}}class eF extends eS{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!em(t)||!t.arrayValue.values)&&t.arrayValue.values.some(e=>eu(this.value.arrayValue,e))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eM{constructor(e,t="asc"){this.field=e,this.dir=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eO{constructor(e,t){this.comparator=e,this.root=t||eP.EMPTY}insert(e,t){return new eO(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,eP.BLACK,null,null))}remove(e){return new eO(this.comparator,this.root.remove(e,this.comparator).copy(null,null,eP.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){let s=this.comparator(e,n.key);if(0===s)return t+n.left.size;s<0?n=n.left:(t+=n.left.size+1,n=n.right)}return -1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){let e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new eU(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new eU(this.root,e,this.comparator,!1)}getReverseIterator(){return new eU(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new eU(this.root,e,this.comparator,!0)}}class eU{constructor(e,t,n,s){this.isReverse=s,this.nodeStack=[];let r=1;for(;!e.isEmpty();)if(r=t?n(e.key,t):1,t&&s&&(r*=-1),r<0)e=this.isReverse?e.left:e.right;else{if(0===r){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class eP{constructor(e,t,n,s,r){this.key=e,this.value=t,this.color=null!=n?n:eP.RED,this.left=null!=s?s:eP.EMPTY,this.right=null!=r?r:eP.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,s,r){return new eP(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=s?s:this.left,null!=r?r:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let s=this,r=n(e,s.key);return(s=r<0?s.copy(null,null,null,s.left.insert(e,t,n),null):0===r?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,n))).fixUp()}removeMin(){if(this.left.isEmpty())return eP.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),(e=e.copy(null,null,null,e.left.removeMin(),null)).fixUp()}remove(e,t){let n,s=this;if(0>t(e,s.key))s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),0===t(e,s.key)){if(s.right.isEmpty())return eP.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=(e=(e=e.copy(null,null,null,null,e.right.rotateRight())).rotateLeft()).colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=(e=e.rotateRight()).colorFlip()),e}rotateLeft(){let e=this.copy(null,null,eP.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,eP.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw v();let e=this.left.check();if(e!==this.right.check())throw v();return e+(this.isRed()?0:1)}}eP.EMPTY=null,eP.RED=!0,eP.BLACK=!1,eP.EMPTY=new class{constructor(){this.size=0}get key(){throw v()}get value(){throw v()}get color(){throw v()}get left(){throw v()}get right(){throw v()}copy(e,t,n,s,r){return this}insert(e,t,n){return new eP(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eq{constructor(e){this.comparator=e,this.data=new eO(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){let n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){let s=n.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new eB(this.data.getIterator())}getIteratorFrom(e){return new eB(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(e=>{t=t.add(e)}),t}isEqual(e){if(!(e instanceof eq)||this.size!==e.size)return!1;let t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){let e=t.getNext().key,s=n.getNext().key;if(0!==this.comparator(e,s))return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new eq(this.comparator);return t.data=e,t}}class eB{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eK{constructor(e){this.fields=e,e.sort(P.comparator)}static empty(){return new eK([])}unionWith(e){let t=new eq(P.comparator);for(let e of this.fields)t=t.add(e);for(let n of e)t=t.add(n);return new eK(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return x(this.fields,e.fields,(e,t)=>e.isEqual(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eQ{constructor(e){this.value=e}static empty(){return new eQ({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(!ey(t=(t.mapValue.fields||{})[e.get(n)]))return null;return(t=(t.mapValue.fields||{})[e.lastSegment()])||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ew(t)}setAll(e){let t=P.emptyPath(),n={},s=[];e.forEach((e,r)=>{if(!t.isImmediateParentOf(r)){let e=this.getFieldsMap(t);this.applyChanges(e,n,s),n={},s=[],t=r.popLast()}e?n[r.lastSegment()]=ew(e):s.push(r.lastSegment())});let r=this.getFieldsMap(t);this.applyChanges(r,n,s)}delete(e){let t=this.field(e.popLast());ey(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return el(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let s=t.mapValue.fields[e.get(n)];ey(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,n){for(let s of(Y(t,(t,n)=>e[t]=n),n))delete e[s]}clone(){return new eQ(ew(this.value))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ez{constructor(e,t,n,s,r,i,a){this.key=e,this.documentType=t,this.version=n,this.readTime=s,this.createTime=r,this.data=i,this.documentState=a}static newInvalidDocument(e){return new ez(e,0,F.min(),F.min(),F.min(),eQ.empty(),0)}static newFoundDocument(e,t,n,s){return new ez(e,1,t,F.min(),n,s,0)}static newNoDocument(e,t){return new ez(e,2,t,F.min(),F.min(),eQ.empty(),0)}static newUnknownDocument(e,t){return new ez(e,3,t,F.min(),F.min(),eQ.empty(),2)}convertToFoundDocument(e,t){return this.createTime.isEqual(F.min())&&(2===this.documentType||0===this.documentType)&&(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=eQ.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=eQ.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=F.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof ez&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ez(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eG{constructor(e,t=null,n=[],s=[],r=null,i=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=s,this.limit=r,this.startAt=i,this.endAt=a,this.ft=null}}function e$(e,t=null,n=[],s=[],r=null,i=null,a=null){return new eG(e,t,n,s,r,i,a)}function ej(e){let t=e;if(null===t.ft){let e=t.path.canonicalString();null!==t.collectionGroup&&(e+="|cg:"+t.collectionGroup),e+="|f:"+t.filters.map(e=>(function e(t){if(t instanceof eS)return t.field.canonicalString()+t.op.toString()+ed(t.value);if(e_(t)&&eA(t))return t.filters.map(t=>e(t)).join(",");{let n=t.filters.map(t=>e(t)).join(",");return`${t.op}(${n})`}})(e)).join(",")+"|ob:"+t.orderBy.map(e=>e.field.canonicalString()+e.dir).join(","),null==t.limit||(e+="|l:"+t.limit),t.startAt&&(e+="|lb:"+(t.startAt.inclusive?"b:":"a:")+t.startAt.position.map(e=>ed(e)).join(",")),t.endAt&&(e+="|ub:"+(t.endAt.inclusive?"a:":"b:")+t.endAt.position.map(e=>ed(e)).join(",")),t.ft=e}return t.ft}function eW(e,t){if(e.limit!==t.limit||e.orderBy.length!==t.orderBy.length)return!1;for(let r=0;r<e.orderBy.length;r++){var n,s;if(n=e.orderBy[r],s=t.orderBy[r],!(n.dir===s.dir&&n.field.isEqual(s.field)))return!1}if(e.filters.length!==t.filters.length)return!1;for(let n=0;n<e.filters.length;n++)if(!function e(t,n){return t instanceof eS?n instanceof eS&&t.op===n.op&&t.field.isEqual(n.field)&&el(t.value,n.value):t instanceof ek?n instanceof ek&&t.op===n.op&&t.filters.length===n.filters.length&&t.filters.reduce((t,s,r)=>t&&e(s,n.filters[r]),!0):void v()}(e.filters[n],t.filters[n]))return!1;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!eI(e.startAt,t.startAt)&&eI(e.endAt,t.endAt)}function eH(e){return q.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eY{constructor(e,t=null,n=[],s=[],r=null,i="F",a=null,o=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=s,this.limit=r,this.limitType=i,this.startAt=a,this.endAt=o,this.dt=null,this._t=null,this.startAt,this.endAt}}function eX(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}function eJ(e){let t=e;if(null===t.dt){t.dt=[];let e=function(e){for(let t of e.filters){let e=t.getFirstInequalityField();if(null!==e)return e}return null}(t),n=t.explicitOrderBy.length>0?t.explicitOrderBy[0].field:null;if(null!==e&&null===n)e.isKeyField()||t.dt.push(new eM(e)),t.dt.push(new eM(P.keyField(),"asc"));else{let e=!1;for(let n of t.explicitOrderBy)t.dt.push(n),n.field.isKeyField()&&(e=!0);if(!e){let e=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";t.dt.push(new eM(P.keyField(),e))}}}return t.dt}function eZ(e){let t=e;if(!t._t){if("F"===t.limitType)t._t=e$(t.path,t.collectionGroup,eJ(t),t.filters,t.limit,t.startAt,t.endAt);else{let e=[];for(let n of eJ(t)){let t="desc"===n.dir?"asc":"desc";e.push(new eM(n.field,t))}let n=t.endAt?new eE(t.endAt.position,t.endAt.inclusive):null,s=t.startAt?new eE(t.startAt.position,t.startAt.inclusive):null;t._t=e$(t.path,t.collectionGroup,e,t.filters,t.limit,n,s)}}return t._t}function e0(e,t,n){return new eY(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function e1(e,t){return eW(eZ(e),eZ(t))&&e.limitType===t.limitType}function e2(e){return`${ej(eZ(e))}|lt:${e.limitType}`}function e4(e){var t;let n;return`Query(target=${n=(t=eZ(e)).path.canonicalString(),null!==t.collectionGroup&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map(e=>(function e(t){return t instanceof eS?`${t.field.canonicalString()} ${t.op} ${ed(t.value)}`:t instanceof ek?t.op.toString()+" {"+t.getFilters().map(e).join(" ,")+"}":"Filter"})(e)).join(", ")}]`),null==t.limit||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map(e=>`${e.field.canonicalString()} (${e.dir})`).join(", ")}]`),t.startAt&&(n+=", startAt: "+(t.startAt.inclusive?"b:":"a:")+t.startAt.position.map(e=>ed(e)).join(",")),t.endAt&&(n+=", endAt: "+(t.endAt.inclusive?"a:":"b:")+t.endAt.position.map(e=>ed(e)).join(",")),`Target(${n})`}; limitType=${e.limitType})`}function e3(e,t){return t.isFoundDocument()&&function(e,t){let n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):q.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(let n of eJ(e))if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(let n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&(!e.startAt||!!function(e,t,n){let s=eT(e,t,n);return e.inclusive?s<=0:s<0}(e.startAt,eJ(e),t))&&(!e.endAt||!!function(e,t,n){let s=eT(e,t,n);return e.inclusive?s>=0:s>0}(e.endAt,eJ(e),t))}function e9(e){return(t,n)=>{let s=!1;for(let r of eJ(e)){let e=function(e,t,n){let s=e.field.isKeyField()?q.comparator(t.key,n.key):function(e,t,n){let s=t.data.field(e),r=n.data.field(e);return null!==s&&null!==r?eh(s,r):v()}(e.field,t,n);switch(e.dir){case"asc":return s;case"desc":return -1*s;default:return v()}}(r,t,n);if(0!==e)return e;s=s||r.field.isKeyField()}return 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function e5(e,t){if(e.wt){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:J(t)?"-0":t}}function e6(e){return{integerValue:""+e}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e8{constructor(){this._=void 0}}function e7(e,t){return e instanceof ti?ef(t)||t&&"doubleValue"in t?t:{integerValue:0}:null}class te extends e8{}class tt extends e8{constructor(e){super(),this.elements=e}}function tn(e,t){let n=to(t);for(let t of e.elements)n.some(e=>el(e,t))||n.push(t);return{arrayValue:{values:n}}}class ts extends e8{constructor(e){super(),this.elements=e}}function tr(e,t){let n=to(t);for(let t of e.elements)n=n.filter(e=>!el(e,t));return{arrayValue:{values:n}}}class ti extends e8{constructor(e,t){super(),this.yt=e,this.gt=t}}function ta(e){return en(e.integerValue||e.doubleValue)}function to(e){return em(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}class tl{constructor(e,t){this.version=e,this.transformResults=t}}class tu{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new tu}static exists(e){return new tu(void 0,e)}static updateTime(e){return new tu(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function th(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class tc{}function td(e,t){if(!e.hasLocalMutations||t&&0===t.fields.length)return null;if(null===t)return e.isNoDocument()?new tE(e.key,tu.none()):new tg(e.key,e.data,tu.none());{let n=e.data,s=eQ.empty(),r=new eq(P.comparator);for(let e of t.fields)if(!r.has(e)){let t=n.field(e);null===t&&e.length>1&&(e=e.popLast(),t=n.field(e)),null===t?s.delete(e):s.set(e,t),r=r.add(e)}return new tp(e.key,s,new eK(r.toArray()),tu.none())}}function tf(e,t,n,s){return e instanceof tg?function(e,t,n,s){if(!th(e.precondition,t))return n;let r=e.value.clone(),i=tv(e.fieldTransforms,s,t);return r.setAll(i),t.convertToFoundDocument(t.version,r).setHasLocalMutations(),null}(e,t,n,s):e instanceof tp?function(e,t,n,s){if(!th(e.precondition,t))return n;let r=tv(e.fieldTransforms,s,t),i=t.data;return(i.setAll(ty(e)),i.setAll(r),t.convertToFoundDocument(t.version,i).setHasLocalMutations(),null===n)?null:n.unionWith(e.fieldMask.fields).unionWith(e.fieldTransforms.map(e=>e.field))}(e,t,n,s):th(e.precondition,t)?(t.convertToNoDocument(t.version).setHasLocalMutations(),null):n}function tm(e,t){var n,s;return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&(n=e.fieldTransforms,s=t.fieldTransforms,!!(void 0===n&&void 0===s||!(!n||!s)&&x(n,s,(e,t)=>{var n,s;return e.field.isEqual(t.field)&&(n=e.transform,s=t.transform,n instanceof tt&&s instanceof tt||n instanceof ts&&s instanceof ts?x(n.elements,s.elements,el):n instanceof ti&&s instanceof ti?el(n.gt,s.gt):n instanceof te&&s instanceof te)})))&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}class tg extends tc{constructor(e,t,n,s=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class tp extends tc{constructor(e,t,n,s,r=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=s,this.fieldTransforms=r,this.type=1}getFieldMask(){return this.fieldMask}}function ty(e){let t=new Map;return e.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){let s=e.data.field(n);t.set(n,s)}}),t}function tw(e,t,n){var s;let r=new Map;e.length===n.length||v();for(let i=0;i<n.length;i++){let a=e[i],o=a.transform,l=t.data.field(a.field);r.set(a.field,(s=n[i],o instanceof tt?tn(o,l):o instanceof ts?tr(o,l):s))}return r}function tv(e,t,n){let s=new Map;for(let r of e){let e=r.transform,i=n.data.field(r.field);s.set(r.field,e instanceof te?function(e,t){let n={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&(n.fields.__previous_value__=t),{mapValue:n}}(t,i):e instanceof tt?tn(e,i):e instanceof ts?tr(e,i):function(e,t){let n=e7(e,t),s=ta(n)+ta(e.gt);return ef(n)&&ef(e.gt)?e6(s):e5(e.yt,s)}(e,i))}return s}class tE extends tc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class tT extends tc{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tI{constructor(e){this.count=e}}function tC(e){if(void 0===e)return p("GRPC error has no .code"),E.UNKNOWN;switch(e){case s.OK:return E.OK;case s.CANCELLED:return E.CANCELLED;case s.UNKNOWN:return E.UNKNOWN;case s.DEADLINE_EXCEEDED:return E.DEADLINE_EXCEEDED;case s.RESOURCE_EXHAUSTED:return E.RESOURCE_EXHAUSTED;case s.INTERNAL:return E.INTERNAL;case s.UNAVAILABLE:return E.UNAVAILABLE;case s.UNAUTHENTICATED:return E.UNAUTHENTICATED;case s.INVALID_ARGUMENT:return E.INVALID_ARGUMENT;case s.NOT_FOUND:return E.NOT_FOUND;case s.ALREADY_EXISTS:return E.ALREADY_EXISTS;case s.PERMISSION_DENIED:return E.PERMISSION_DENIED;case s.FAILED_PRECONDITION:return E.FAILED_PRECONDITION;case s.ABORTED:return E.ABORTED;case s.OUT_OF_RANGE:return E.OUT_OF_RANGE;case s.UNIMPLEMENTED:return E.UNIMPLEMENTED;case s.DATA_LOSS:return E.DATA_LOSS;default:return v()}}(r=s||(s={}))[r.OK=0]="OK",r[r.CANCELLED=1]="CANCELLED",r[r.UNKNOWN=2]="UNKNOWN",r[r.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",r[r.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",r[r.NOT_FOUND=5]="NOT_FOUND",r[r.ALREADY_EXISTS=6]="ALREADY_EXISTS",r[r.PERMISSION_DENIED=7]="PERMISSION_DENIED",r[r.UNAUTHENTICATED=16]="UNAUTHENTICATED",r[r.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",r[r.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",r[r.ABORTED=10]="ABORTED",r[r.OUT_OF_RANGE=11]="OUT_OF_RANGE",r[r.UNIMPLEMENTED=12]="UNIMPLEMENTED",r[r.INTERNAL=13]="INTERNAL",r[r.UNAVAILABLE=14]="UNAVAILABLE",r[r.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tS{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n){for(let[t,s]of n)if(this.equalsFn(t,e))return s}}has(e){return void 0!==this.get(e)}set(e,t){let n=this.mapKeyFn(e),s=this.inner[n];if(void 0===s)return this.inner[n]=[[e,t]],void this.innerSize++;for(let n=0;n<s.length;n++)if(this.equalsFn(s[n][0],e))return void(s[n]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let s=0;s<n.length;s++)if(this.equalsFn(n[s][0],e))return 1===n.length?delete this.inner[t]:n.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Y(this.inner,(t,n)=>{for(let[t,s]of n)e(t,s)})}isEmpty(){return X(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tk=new eO(q.comparator),tA=new eO(q.comparator);function t_(...e){let t=tA;for(let n of e)t=t.insert(n.key,n);return t}function tN(e){let t=tA;return e.forEach((e,n)=>t=t.insert(e,n.overlayedDocument)),t}function tb(){return new tS(e=>e.toString(),(e,t)=>e.isEqual(t))}let tD=new eO(q.comparator),tR=new eq(q.comparator);function tL(...e){let t=tR;for(let n of e)t=t.add(n);return t}let tx=new eq(L);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tV{constructor(e,t,n,s,r){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=r}static createSynthesizedRemoteEventForCurrentChange(e,t,n){let s=new Map;return s.set(e,tF.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new tV(F.min(),s,tx,tk,tL())}}class tF{constructor(e,t,n,s,r){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=r}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new tF(n,t,tL(),tL(),tL())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tM{constructor(e,t,n,s){this.It=e,this.removedTargetIds=t,this.key=n,this.Tt=s}}class tO{constructor(e,t){this.targetId=e,this.Et=t}}class tU{constructor(e,t,n=Z.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=s}}class tP{constructor(){this.At=0,this.Rt=tK(),this.bt=Z.EMPTY_BYTE_STRING,this.Pt=!1,this.vt=!0}get current(){return this.Pt}get resumeToken(){return this.bt}get Vt(){return 0!==this.At}get St(){return this.vt}Dt(e){e.approximateByteSize()>0&&(this.vt=!0,this.bt=e)}Ct(){let e=tL(),t=tL(),n=tL();return this.Rt.forEach((s,r)=>{switch(r){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:n=n.add(s);break;default:v()}}),new tF(this.bt,this.Pt,e,t,n)}xt(){this.vt=!1,this.Rt=tK()}Nt(e,t){this.vt=!0,this.Rt=this.Rt.insert(e,t)}kt(e){this.vt=!0,this.Rt=this.Rt.remove(e)}Ot(){this.At+=1}Mt(){this.At-=1}Ft(){this.vt=!0,this.Pt=!0}}class tq{constructor(e){this.$t=e,this.Bt=new Map,this.Lt=tk,this.qt=tB(),this.Ut=new eq(L)}Kt(e){for(let t of e.It)e.Tt&&e.Tt.isFoundDocument()?this.Gt(t,e.Tt):this.Qt(t,e.key,e.Tt);for(let t of e.removedTargetIds)this.Qt(t,e.key,e.Tt)}jt(e){this.forEachTarget(e,t=>{let n=this.Wt(t);switch(e.state){case 0:this.zt(t)&&n.Dt(e.resumeToken);break;case 1:n.Mt(),n.Vt||n.xt(),n.Dt(e.resumeToken);break;case 2:n.Mt(),n.Vt||this.removeTarget(t);break;case 3:this.zt(t)&&(n.Ft(),n.Dt(e.resumeToken));break;case 4:this.zt(t)&&(this.Ht(t),n.Dt(e.resumeToken));break;default:v()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Bt.forEach((e,n)=>{this.zt(n)&&t(n)})}Jt(e){let t=e.targetId,n=e.Et.count,s=this.Yt(t);if(s){let e=s.target;if(eH(e)){if(0===n){let n=new q(e.path);this.Qt(t,n,ez.newNoDocument(n,F.min()))}else 1===n||v()}else this.Xt(t)!==n&&(this.Ht(t),this.Ut=this.Ut.add(t))}}Zt(e){let t=new Map;this.Bt.forEach((n,s)=>{let r=this.Yt(s);if(r){if(n.current&&eH(r.target)){let t=new q(r.target.path);null!==this.Lt.get(t)||this.te(s,t)||this.Qt(s,t,ez.newNoDocument(t,e))}n.St&&(t.set(s,n.Ct()),n.xt())}});let n=tL();this.qt.forEach((e,t)=>{let s=!0;t.forEachWhile(e=>{let t=this.Yt(e);return!t||2===t.purpose||(s=!1,!1)}),s&&(n=n.add(e))}),this.Lt.forEach((t,n)=>n.setReadTime(e));let s=new tV(e,t,this.Ut,this.Lt,n);return this.Lt=tk,this.qt=tB(),this.Ut=new eq(L),s}Gt(e,t){if(!this.zt(e))return;let n=this.te(e,t.key)?2:0;this.Wt(e).Nt(t.key,n),this.Lt=this.Lt.insert(t.key,t),this.qt=this.qt.insert(t.key,this.ee(t.key).add(e))}Qt(e,t,n){if(!this.zt(e))return;let s=this.Wt(e);this.te(e,t)?s.Nt(t,1):s.kt(t),this.qt=this.qt.insert(t,this.ee(t).delete(e)),n&&(this.Lt=this.Lt.insert(t,n))}removeTarget(e){this.Bt.delete(e)}Xt(e){let t=this.Wt(e).Ct();return this.$t.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ot(e){this.Wt(e).Ot()}Wt(e){let t=this.Bt.get(e);return t||(t=new tP,this.Bt.set(e,t)),t}ee(e){let t=this.qt.get(e);return t||(t=new eq(L),this.qt=this.qt.insert(e,t)),t}zt(e){let t=null!==this.Yt(e);return t||g("WatchChangeAggregator","Detected inactive target",e),t}Yt(e){let t=this.Bt.get(e);return t&&t.Vt?null:this.$t.ne(e)}Ht(e){this.Bt.set(e,new tP),this.$t.getRemoteKeysForTarget(e).forEach(t=>{this.Qt(e,t,null)})}te(e,t){return this.$t.getRemoteKeysForTarget(e).has(t)}}function tB(){return new eO(q.comparator)}function tK(){return new eO(q.comparator)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tQ={asc:"ASCENDING",desc:"DESCENDING"},tz={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},tG={and:"AND",or:"OR"};class t${constructor(e,t){this.databaseId=e,this.wt=t}}function tj(e,t){return e.wt?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function tW(e,t){return e.wt?t.toBase64():t.toUint8Array()}function tH(e){return e||v(),F.fromTimestamp(function(e){let t=et(e);return new V(t.seconds,t.nanos)}(e))}function tY(e,t){return new O(["projects",e.projectId,"databases",e.database]).child("documents").child(t).canonicalString()}function tX(e){let t=O.fromString(e);return t5(t)||v(),t}function tJ(e,t){return tY(e.databaseId,t.path)}function tZ(e,t){let n=tX(t);if(n.get(1)!==e.databaseId.projectId)throw new T(E.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new T(E.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new q(t2(n))}function t0(e,t){return tY(e.databaseId,t)}function t1(e){return new O(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function t2(e){return e.length>4&&"documents"===e.get(4)||v(),e.popFirst(5)}function t4(e,t,n){return{name:tJ(e,t),fields:n.value.mapValue.fields}}function t3(e){return{fieldPath:e.canonicalString()}}function t9(e){return P.fromServerFormat(e.fieldPath)}function t5(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t6{constructor(e,t,n,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=s}applyToRemoteDocument(e,t){let n=t.mutationResults;for(let t=0;t<this.mutations.length;t++){let r=this.mutations[t];if(r.key.isEqual(e.key)){var s;s=n[t],r instanceof tg?function(e,t,n){let s=e.value.clone(),r=tw(e.fieldTransforms,t,n.transformResults);s.setAll(r),t.convertToFoundDocument(n.version,s).setHasCommittedMutations()}(r,e,s):r instanceof tp?function(e,t,n){if(!th(e.precondition,t))return void t.convertToUnknownDocument(n.version);let s=tw(e.fieldTransforms,t,n.transformResults),r=t.data;r.setAll(ty(e)),r.setAll(s),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(r,e,s):function(e,t,n){t.convertToNoDocument(n.version).setHasCommittedMutations()}(0,e,s)}}}applyToLocalView(e,t){for(let n of this.baseMutations)n.key.isEqual(e.key)&&(t=tf(n,e,t,this.localWriteTime));for(let n of this.mutations)n.key.isEqual(e.key)&&(t=tf(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let n=tb();return this.mutations.forEach(s=>{let r=e.get(s.key),i=r.overlayedDocument,a=this.applyToLocalView(i,r.mutatedFields);a=t.has(s.key)?null:a;let o=td(i,a);null!==o&&n.set(s.key,o),i.isValidDocument()||i.convertToNoDocument(F.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),tL())}isEqual(e){return this.batchId===e.batchId&&x(this.mutations,e.mutations,(e,t)=>tm(e,t))&&x(this.baseMutations,e.baseMutations,(e,t)=>tm(e,t))}}class t8{constructor(e,t,n,s){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=s}static from(e,t,n){e.mutations.length===n.length||v();let s=tD,r=e.mutations;for(let e=0;e<r.length;e++)s=s.insert(r[e].key,n[e].version);return new t8(e,t,n,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t7{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return null!==e&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ne{constructor(e,t,n,s,r=F.min(),i=F.min(),a=Z.EMPTY_BYTE_STRING){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=r,this.lastLimboFreeSnapshotVersion=i,this.resumeToken=a}withSequenceNumber(e){return new ne(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(e,t){return new ne(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e)}withLastLimboFreeSnapshotVersion(e){return new ne(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e){this.ie=e}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn{constructor(){}ue(e,t){this.ce(e,t),t.ae()}ce(e,t){if("nullValue"in e)this.he(t,5);else if("booleanValue"in e)this.he(t,10),t.le(e.booleanValue?1:0);else if("integerValue"in e)this.he(t,15),t.le(en(e.integerValue));else if("doubleValue"in e){let n=en(e.doubleValue);isNaN(n)?this.he(t,13):(this.he(t,15),J(n)?t.le(0):t.le(n))}else if("timestampValue"in e){let n=e.timestampValue;this.he(t,20),"string"==typeof n?t.fe(n):(t.fe(`${n.seconds||""}`),t.le(n.nanos||0))}else if("stringValue"in e)this.de(e.stringValue,t),this._e(t);else if("bytesValue"in e)this.he(t,30),t.we(es(e.bytesValue)),this._e(t);else if("referenceValue"in e)this.me(e.referenceValue,t);else if("geoPointValue"in e){let n=e.geoPointValue;this.he(t,45),t.le(n.latitude||0),t.le(n.longitude||0)}else"mapValue"in e?ev(e)?this.he(t,Number.MAX_SAFE_INTEGER):(this.ge(e.mapValue,t),this._e(t)):"arrayValue"in e?(this.ye(e.arrayValue,t),this._e(t)):v()}de(e,t){this.he(t,25),this.pe(e,t)}pe(e,t){t.fe(e)}ge(e,t){let n=e.fields||{};for(let e of(this.he(t,55),Object.keys(n)))this.de(e,t),this.ce(n[e],t)}ye(e,t){let n=e.values||[];for(let e of(this.he(t,50),n))this.ce(e,t)}me(e,t){this.he(t,37),q.fromName(e).path.forEach(e=>{this.he(t,60),this.pe(e,t)})}he(e,t){e.le(t)}_e(e){e.le(2)}}nn.Ie=new nn;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns{constructor(){this.Je=new nr}addToCollectionParentIndex(e,t){return this.Je.add(t),z.resolve()}getCollectionParents(e,t){return z.resolve(this.Je.getEntries(t))}addFieldIndex(e,t){return z.resolve()}deleteFieldIndex(e,t){return z.resolve()}getDocumentsMatchingTarget(e,t){return z.resolve(null)}getIndexType(e,t){return z.resolve(0)}getFieldIndexes(e,t){return z.resolve([])}getNextCollectionGroupToUpdate(e){return z.resolve(null)}getMinOffset(e,t){return z.resolve(B.min())}getMinOffsetFromCollectionGroup(e,t){return z.resolve(B.min())}updateCollectionGroup(e,t,n){return z.resolve()}updateIndexEntries(e,t){return z.resolve()}}class nr{constructor(){this.index={}}add(e){let t=e.lastSegment(),n=e.popLast(),s=this.index[t]||new eq(O.comparator),r=!s.has(n);return this.index[t]=s.add(n),r}has(e){let t=e.lastSegment(),n=e.popLast(),s=this.index[t];return s&&s.has(n)}getEntries(e){return(this.index[e]||new eq(O.comparator)).toArray()}}new Uint8Array(0);class ni{constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}static withCacheSize(e){return new ni(e,ni.DEFAULT_COLLECTION_PERCENTILE,ni.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ni.DEFAULT_COLLECTION_PERCENTILE=10,ni.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ni.DEFAULT=new ni(41943040,ni.DEFAULT_COLLECTION_PERCENTILE,ni.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ni.DISABLED=new ni(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na{constructor(e){this.bn=e}next(){return this.bn+=2,this.bn}static Pn(){return new na(0)}static vn(){return new na(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no{constructor(){this.changes=new tS(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ez.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let n=this.changes.get(t);return void 0!==n?z.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nl{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nu{constructor(e,t,n,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=s}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(n=s,this.remoteDocumentCache.getEntry(e,t))).next(e=>(null!==n&&tf(n.mutation,e,eK.empty(),V.now()),e))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.getLocalViewOfDocuments(e,t,tL()).next(()=>t))}getLocalViewOfDocuments(e,t,n=tL()){let s=tb();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,n).next(e=>{let t=t_();return e.forEach((e,n)=>{t=t.insert(e,n.overlayedDocument)}),t}))}getOverlayedDocuments(e,t){let n=tb();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,tL()))}populateOverlays(e,t,n){let s=[];return n.forEach(e=>{t.has(e)||s.push(e)}),this.documentOverlayCache.getOverlays(e,s).next(e=>{e.forEach((e,n)=>{t.set(e,n)})})}computeViews(e,t,n,s){let r=tk,i=tb(),a=tb();return t.forEach((e,t)=>{let a=n.get(t.key);s.has(t.key)&&(void 0===a||a.mutation instanceof tp)?r=r.insert(t.key,t):void 0!==a?(i.set(t.key,a.mutation.getFieldMask()),tf(a.mutation,t,a.mutation.getFieldMask(),V.now())):i.set(t.key,eK.empty())}),this.recalculateAndSaveOverlays(e,r).next(e=>(e.forEach((e,t)=>i.set(e,t)),t.forEach((e,t)=>{var n;return a.set(e,new nl(t,null!==(n=i.get(e))&&void 0!==n?n:null))}),a))}recalculateAndSaveOverlays(e,t){let n=tb(),s=new eO((e,t)=>e-t),r=tL();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(e=>{for(let r of e)r.keys().forEach(e=>{let i=t.get(e);if(null===i)return;let a=n.get(e)||eK.empty();a=r.applyToLocalView(i,a),n.set(e,a);let o=(s.get(r.batchId)||tL()).add(e);s=s.insert(r.batchId,o)})}).next(()=>{let i=[],a=s.getReverseIterator();for(;a.hasNext();){let s=a.getNext(),o=s.key,l=s.value,u=tb();l.forEach(e=>{if(!r.has(e)){let s=td(t.get(e),n.get(e));null!==s&&u.set(e,s),r=r.add(e)}}),i.push(this.documentOverlayCache.saveOverlays(e,o,u))}return z.waitFor(i)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(t=>this.recalculateAndSaveOverlays(e,t))}getDocumentsMatchingQuery(e,t,n){return q.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length?this.getDocumentsMatchingDocumentQuery(e,t.path):null!==t.collectionGroup?this.getDocumentsMatchingCollectionGroupQuery(e,t,n):this.getDocumentsMatchingCollectionQuery(e,t,n)}getNextDocuments(e,t,n,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,s).next(r=>{let i=s-r.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,s-r.size):z.resolve(tb()),a=-1,o=r;return i.next(t=>z.forEach(t,(t,n)=>(a<n.largestBatchId&&(a=n.largestBatchId),r.get(t)?z.resolve():this.remoteDocumentCache.getEntry(e,t).next(e=>{o=o.insert(t,e)}))).next(()=>this.populateOverlays(e,t,r)).next(()=>this.computeViews(e,o,t,tL())).next(e=>({batchId:a,changes:tN(e)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new q(t)).next(e=>{let t=t_();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t})}getDocumentsMatchingCollectionGroupQuery(e,t,n){let s=t.collectionGroup,r=t_();return this.indexManager.getCollectionParents(e,s).next(i=>z.forEach(i,i=>{var a;let o=(a=i.child(s),new eY(a,null,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt));return this.getDocumentsMatchingCollectionQuery(e,o,n).next(e=>{e.forEach((e,t)=>{r=r.insert(e,t)})})}).next(()=>r))}getDocumentsMatchingCollectionQuery(e,t,n){let s;return this.remoteDocumentCache.getAllFromCollection(e,t.path,n).next(r=>(s=r,this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId))).next(e=>{e.forEach((e,t)=>{let n=t.getKey();null===s.get(n)&&(s=s.insert(n,ez.newInvalidDocument(n)))});let n=t_();return s.forEach((s,r)=>{let i=e.get(s);void 0!==i&&tf(i.mutation,r,eK.empty(),V.now()),e3(t,r)&&(n=n.insert(s,r))}),n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nh{constructor(e){this.yt=e,this.Zn=new Map,this.ts=new Map}getBundleMetadata(e,t){return z.resolve(this.Zn.get(t))}saveBundleMetadata(e,t){return this.Zn.set(t.id,{id:t.id,version:t.version,createTime:tH(t.createTime)}),z.resolve()}getNamedQuery(e,t){return z.resolve(this.ts.get(t))}saveNamedQuery(e,t){return this.ts.set(t.name,{name:t.name,query:function(e){let t=function(e){var t,n,s,r,i,a,o,l;let u,h=function(e){let t=tX(e);return 4===t.length?O.emptyPath():t2(t)}(e.parent),c=e.structuredQuery,d=c.from?c.from.length:0,f=null;if(d>0){1===d||v();let e=c.from[0];e.allDescendants?f=e.collectionId:h=h.child(e.collectionId)}let m=[];c.where&&(m=function(e){var t;let n=function e(t){return void 0!==t.unaryFilter?function(e){switch(e.unaryFilter.op){case"IS_NAN":let t=t9(e.unaryFilter.field);return eS.create(t,"==",{doubleValue:NaN});case"IS_NULL":let n=t9(e.unaryFilter.field);return eS.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let s=t9(e.unaryFilter.field);return eS.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let r=t9(e.unaryFilter.field);return eS.create(r,"!=",{nullValue:"NULL_VALUE"});default:return v()}}(t):void 0!==t.fieldFilter?eS.create(t9(t.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return v()}}(t.fieldFilter.op),t.fieldFilter.value):void 0!==t.compositeFilter?ek.create(t.compositeFilter.filters.map(t=>e(t)),function(e){switch(e){case"AND":return"and";case"OR":return"or";default:return v()}}(t.compositeFilter.op)):v()}(e);return n instanceof ek&&e_(t=n)&&eA(t)?n.getFilters():[n]}(c.where));let g=[];c.orderBy&&(g=c.orderBy.map(e=>new eM(t9(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))));let p=null;c.limit&&(p=null==(u="object"==typeof(t=c.limit)?t.value:t)?null:u);let y=null;c.startAt&&(y=function(e){let t=!!e.before,n=e.values||[];return new eE(n,t)}(c.startAt));let w=null;return c.endAt&&(w=function(e){let t=!e.before,n=e.values||[];return new eE(n,t)}(c.endAt)),n=h,s=f,r=g,i=m,a=p,o=y,l=w,new eY(n,s,r,i,a,"F",o,l)}({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?e0(t,t.limit,"L"):t}(t.bundledQuery),readTime:tH(t.readTime)}),z.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nc{constructor(){this.overlays=new eO(q.comparator),this.es=new Map}getOverlay(e,t){return z.resolve(this.overlays.get(t))}getOverlays(e,t){let n=tb();return z.forEach(t,t=>this.getOverlay(e,t).next(e=>{null!==e&&n.set(t,e)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((n,s)=>{this.oe(e,t,s)}),z.resolve()}removeOverlaysForBatchId(e,t,n){let s=this.es.get(n);return void 0!==s&&(s.forEach(e=>this.overlays=this.overlays.remove(e)),this.es.delete(n)),z.resolve()}getOverlaysForCollection(e,t,n){let s=tb(),r=t.length+1,i=new q(t.child("")),a=this.overlays.getIteratorFrom(i);for(;a.hasNext();){let e=a.getNext().value,i=e.getKey();if(!t.isPrefixOf(i.path))break;i.path.length===r&&e.largestBatchId>n&&s.set(e.getKey(),e)}return z.resolve(s)}getOverlaysForCollectionGroup(e,t,n,s){let r=new eO((e,t)=>e-t),i=this.overlays.getIterator();for(;i.hasNext();){let e=i.getNext().value;if(e.getKey().getCollectionGroup()===t&&e.largestBatchId>n){let t=r.get(e.largestBatchId);null===t&&(t=tb(),r=r.insert(e.largestBatchId,t)),t.set(e.getKey(),e)}}let a=tb(),o=r.getIterator();for(;o.hasNext()&&(o.getNext().value.forEach((e,t)=>a.set(e,t)),!(a.size()>=s)););return z.resolve(a)}oe(e,t,n){let s=this.overlays.get(n.key);if(null!==s){let e=this.es.get(s.largestBatchId).delete(n.key);this.es.set(s.largestBatchId,e)}this.overlays=this.overlays.insert(n.key,new t7(t,n));let r=this.es.get(t);void 0===r&&(r=tL(),this.es.set(t,r)),this.es.set(t,r.add(n.key))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nd{constructor(){this.ns=new eq(nf.ss),this.rs=new eq(nf.os)}isEmpty(){return this.ns.isEmpty()}addReference(e,t){let n=new nf(e,t);this.ns=this.ns.add(n),this.rs=this.rs.add(n)}us(e,t){e.forEach(e=>this.addReference(e,t))}removeReference(e,t){this.cs(new nf(e,t))}hs(e,t){e.forEach(e=>this.removeReference(e,t))}ls(e){let t=new q(new O([])),n=new nf(t,e),s=new nf(t,e+1),r=[];return this.rs.forEachInRange([n,s],e=>{this.cs(e),r.push(e.key)}),r}fs(){this.ns.forEach(e=>this.cs(e))}cs(e){this.ns=this.ns.delete(e),this.rs=this.rs.delete(e)}ds(e){let t=new q(new O([])),n=new nf(t,e),s=new nf(t,e+1),r=tL();return this.rs.forEachInRange([n,s],e=>{r=r.add(e.key)}),r}containsKey(e){let t=new nf(e,0),n=this.ns.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class nf{constructor(e,t){this.key=e,this._s=t}static ss(e,t){return q.comparator(e.key,t.key)||L(e._s,t._s)}static os(e,t){return L(e._s,t._s)||q.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nm{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.ws=1,this.gs=new eq(nf.ss)}checkEmpty(e){return z.resolve(0===this.mutationQueue.length)}addMutationBatch(e,t,n,s){let r=this.ws;this.ws++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let i=new t6(r,t,n,s);for(let t of(this.mutationQueue.push(i),s))this.gs=this.gs.add(new nf(t.key,r)),this.indexManager.addToCollectionParentIndex(e,t.key.path.popLast());return z.resolve(i)}lookupMutationBatch(e,t){return z.resolve(this.ys(t))}getNextMutationBatchAfterBatchId(e,t){let n=this.ps(t+1),s=n<0?0:n;return z.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return z.resolve(0===this.mutationQueue.length?-1:this.ws-1)}getAllMutationBatches(e){return z.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let n=new nf(t,0),s=new nf(t,Number.POSITIVE_INFINITY),r=[];return this.gs.forEachInRange([n,s],e=>{let t=this.ys(e._s);r.push(t)}),z.resolve(r)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new eq(L);return t.forEach(e=>{let t=new nf(e,0),s=new nf(e,Number.POSITIVE_INFINITY);this.gs.forEachInRange([t,s],e=>{n=n.add(e._s)})}),z.resolve(this.Is(n))}getAllMutationBatchesAffectingQuery(e,t){let n=t.path,s=n.length+1,r=n;q.isDocumentKey(r)||(r=r.child(""));let i=new nf(new q(r),0),a=new eq(L);return this.gs.forEachWhile(e=>{let t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===s&&(a=a.add(e._s)),!0)},i),z.resolve(this.Is(a))}Is(e){let t=[];return e.forEach(e=>{let n=this.ys(e);null!==n&&t.push(n)}),t}removeMutationBatch(e,t){0===this.Ts(t.batchId,"removed")||v(),this.mutationQueue.shift();let n=this.gs;return z.forEach(t.mutations,s=>{let r=new nf(s.key,t.batchId);return n=n.delete(r),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.gs=n})}An(e){}containsKey(e,t){let n=new nf(t,0),s=this.gs.firstAfterOrEqual(n);return z.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,z.resolve()}Ts(e,t){return this.ps(e)}ps(e){return 0===this.mutationQueue.length?0:e-this.mutationQueue[0].batchId}ys(e){let t=this.ps(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ng{constructor(e){this.Es=e,this.docs=new eO(q.comparator),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let n=t.key,s=this.docs.get(n),r=s?s.size:0,i=this.Es(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:i}),this.size+=i-r,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let n=this.docs.get(t);return z.resolve(n?n.document.mutableCopy():ez.newInvalidDocument(t))}getEntries(e,t){let n=tk;return t.forEach(e=>{let t=this.docs.get(e);n=n.insert(e,t?t.document.mutableCopy():ez.newInvalidDocument(e))}),z.resolve(n)}getAllFromCollection(e,t,n){let s=tk,r=new q(t.child("")),i=this.docs.getIteratorFrom(r);for(;i.hasNext();){let{key:e,value:{document:r}}=i.getNext();if(!t.isPrefixOf(e.path))break;e.path.length>t.length+1||0>=function(e,t){let n=e.readTime.compareTo(t.readTime);return 0!==n?n:0!==(n=q.comparator(e.documentKey,t.documentKey))?n:L(e.largestBatchId,t.largestBatchId)}(new B(r.readTime,r.key,-1),n)||(s=s.insert(r.key,r.mutableCopy()))}return z.resolve(s)}getAllFromCollectionGroup(e,t,n,s){v()}As(e,t){return z.forEach(this.docs,e=>t(e))}newChangeBuffer(e){return new np(this)}getSize(e){return z.resolve(this.size)}}class np extends no{constructor(e){super(),this.Yn=e}applyChanges(e){let t=[];return this.changes.forEach((n,s)=>{s.isValidDocument()?t.push(this.Yn.addEntry(e,s)):this.Yn.removeEntry(n)}),z.waitFor(t)}getFromCache(e,t){return this.Yn.getEntry(e,t)}getAllFromCache(e,t){return this.Yn.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ny{constructor(e){this.persistence=e,this.Rs=new tS(e=>ej(e),eW),this.lastRemoteSnapshotVersion=F.min(),this.highestTargetId=0,this.bs=0,this.Ps=new nd,this.targetCount=0,this.vs=na.Pn()}forEachTarget(e,t){return this.Rs.forEach((e,n)=>t(n)),z.resolve()}getLastRemoteSnapshotVersion(e){return z.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return z.resolve(this.bs)}allocateTargetId(e){return this.highestTargetId=this.vs.next(),z.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.bs&&(this.bs=t),z.resolve()}Dn(e){this.Rs.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.vs=new na(t),this.highestTargetId=t),e.sequenceNumber>this.bs&&(this.bs=e.sequenceNumber)}addTargetData(e,t){return this.Dn(t),this.targetCount+=1,z.resolve()}updateTargetData(e,t){return this.Dn(t),z.resolve()}removeTargetData(e,t){return this.Rs.delete(t.target),this.Ps.ls(t.targetId),this.targetCount-=1,z.resolve()}removeTargets(e,t,n){let s=0,r=[];return this.Rs.forEach((i,a)=>{a.sequenceNumber<=t&&null===n.get(a.targetId)&&(this.Rs.delete(i),r.push(this.removeMatchingKeysForTargetId(e,a.targetId)),s++)}),z.waitFor(r).next(()=>s)}getTargetCount(e){return z.resolve(this.targetCount)}getTargetData(e,t){let n=this.Rs.get(t)||null;return z.resolve(n)}addMatchingKeys(e,t,n){return this.Ps.us(t,n),z.resolve()}removeMatchingKeys(e,t,n){this.Ps.hs(t,n);let s=this.persistence.referenceDelegate,r=[];return s&&t.forEach(t=>{r.push(s.markPotentiallyOrphaned(e,t))}),z.waitFor(r)}removeMatchingKeysForTargetId(e,t){return this.Ps.ls(t),z.resolve()}getMatchingKeysForTargetId(e,t){let n=this.Ps.ds(t);return z.resolve(n)}containsKey(e,t){return z.resolve(this.Ps.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nw{constructor(e,t){var n;this.Vs={},this.overlays={},this.Ss=new $(0),this.Ds=!1,this.Ds=!0,this.referenceDelegate=e(this),this.Cs=new ny(this),this.indexManager=new ns,this.remoteDocumentCache=(n=e=>this.referenceDelegate.xs(e),new ng(n)),this.yt=new nt(t),this.Ns=new nh(this.yt)}start(){return Promise.resolve()}shutdown(){return this.Ds=!1,Promise.resolve()}get started(){return this.Ds}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new nc,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.Vs[e.toKey()];return n||(n=new nm(t,this.referenceDelegate),this.Vs[e.toKey()]=n),n}getTargetCache(){return this.Cs}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ns}runTransaction(e,t,n){g("MemoryPersistence","Starting transaction:",e);let s=new nv(this.Ss.next());return this.referenceDelegate.ks(),n(s).next(e=>this.referenceDelegate.Os(s).next(()=>e)).toPromise().then(e=>(s.raiseOnCommittedEvent(),e))}Ms(e,t){return z.or(Object.values(this.Vs).map(n=>()=>n.containsKey(e,t)))}}class nv extends K{constructor(e){super(),this.currentSequenceNumber=e}}class nE{constructor(e){this.persistence=e,this.Fs=new nd,this.$s=null}static Bs(e){return new nE(e)}get Ls(){if(this.$s)return this.$s;throw v()}addReference(e,t,n){return this.Fs.addReference(n,t),this.Ls.delete(n.toString()),z.resolve()}removeReference(e,t,n){return this.Fs.removeReference(n,t),this.Ls.add(n.toString()),z.resolve()}markPotentiallyOrphaned(e,t){return this.Ls.add(t.toString()),z.resolve()}removeTarget(e,t){this.Fs.ls(t.targetId).forEach(e=>this.Ls.add(e.toString()));let n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(e=>{e.forEach(e=>this.Ls.add(e.toString()))}).next(()=>n.removeTargetData(e,t))}ks(){this.$s=new Set}Os(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return z.forEach(this.Ls,n=>{let s=q.fromPath(n);return this.qs(e,s).next(e=>{e||t.removeEntry(s,F.min())})}).next(()=>(this.$s=null,t.apply(e)))}updateLimboDocument(e,t){return this.qs(e,t).next(e=>{e?this.Ls.delete(t.toString()):this.Ls.add(t.toString())})}xs(e){return 0}qs(e,t){return z.or([()=>z.resolve(this.Fs.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ms(e,t)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nT{constructor(e,t,n,s){this.targetId=e,this.fromCache=t,this.Si=n,this.Di=s}static Ci(e,t){let n=tL(),s=tL();for(let e of t.docChanges)switch(e.type){case 0:n=n.add(e.doc.key);break;case 1:s=s.add(e.doc.key)}return new nT(e,t.fromCache,n,s)}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nI{constructor(){this.xi=!1}initialize(e,t){this.Ni=e,this.indexManager=t,this.xi=!0}getDocumentsMatchingQuery(e,t,n,s){return this.ki(e,t).next(r=>r||this.Oi(e,t,s,n)).next(n=>n||this.Mi(e,t))}ki(e,t){if(eX(t))return z.resolve(null);let n=eZ(t);return this.indexManager.getIndexType(e,n).next(s=>0===s?null:(null!==t.limit&&1===s&&(n=eZ(t=e0(t,null,"F"))),this.indexManager.getDocumentsMatchingTarget(e,n).next(s=>{let r=tL(...s);return this.Ni.getDocuments(e,r).next(s=>this.indexManager.getMinOffset(e,n).next(n=>{let i=this.Fi(t,s);return this.$i(t,i,r,n.readTime)?this.ki(e,e0(t,null,"F")):this.Bi(e,i,t,n)}))})))}Oi(e,t,n,s){return eX(t)||s.isEqual(F.min())?this.Mi(e,t):this.Ni.getDocuments(e,n).next(r=>{let i=this.Fi(t,r);return this.$i(t,i,n,s)?this.Mi(e,t):(m()<=o.in.DEBUG&&g("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),e4(t)),this.Bi(e,i,t,function(e,t){let n=e.toTimestamp().seconds,s=e.toTimestamp().nanoseconds+1,r=F.fromTimestamp(1e9===s?new V(n+1,0):new V(n,s));return new B(r,q.empty(),-1)}(s,0)))})}Fi(e,t){let n=new eq(e9(e));return t.forEach((t,s)=>{e3(e,s)&&(n=n.add(s))}),n}$i(e,t,n,s){if(null===e.limit)return!1;if(n.size!==t.size)return!0;let r="F"===e.limitType?t.last():t.first();return!!r&&(r.hasPendingWrites||r.version.compareTo(s)>0)}Mi(e,t){return m()<=o.in.DEBUG&&g("QueryEngine","Using full collection scan to execute query:",e4(t)),this.Ni.getDocumentsMatchingQuery(e,t,B.min())}Bi(e,t,n,s){return this.Ni.getDocumentsMatchingQuery(e,n,s).next(e=>(t.forEach(t=>{e=e.insert(t.key,t)}),e))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nC{constructor(e,t,n,s){this.persistence=e,this.Li=t,this.yt=s,this.qi=new eO(L),this.Ui=new tS(e=>ej(e),eW),this.Ki=new Map,this.Gi=e.getRemoteDocumentCache(),this.Cs=e.getTargetCache(),this.Ns=e.getBundleCache(),this.Qi(n)}Qi(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new nu(this.Gi,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Gi.setIndexManager(this.indexManager),this.Li.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.qi))}}async function nS(e,t){return await e.persistence.runTransaction("Handle user change","readonly",n=>{let s;return e.mutationQueue.getAllMutationBatches(n).next(r=>(s=r,e.Qi(t),e.mutationQueue.getAllMutationBatches(n))).next(t=>{let r=[],i=[],a=tL();for(let e of s)for(let t of(r.push(e.batchId),e.mutations))a=a.add(t.key);for(let e of t)for(let t of(i.push(e.batchId),e.mutations))a=a.add(t.key);return e.localDocuments.getDocuments(n,a).next(e=>({ji:e,removedBatchIds:r,addedBatchIds:i}))})})}function nk(e){return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Cs.getLastRemoteSnapshotVersion(t))}async function nA(e,t,n){let s=e,r=s.qi.get(t);try{n||await s.persistence.runTransaction("Release target",n?"readwrite":"readwrite-primary",e=>s.persistence.referenceDelegate.removeTarget(e,r))}catch(e){if(!G(e))throw e;g("LocalStore",`Failed to update sequence numbers for target ${t}: ${e}`)}s.qi=s.qi.remove(t),s.Ui.delete(r.target)}function n_(e,t,n){let s=F.min(),r=tL();return e.persistence.runTransaction("Execute query","readonly",i=>(function(e,t,n){let s=e.Ui.get(n);return void 0!==s?z.resolve(e.qi.get(s)):e.Cs.getTargetData(t,n)})(e,i,eZ(t)).next(t=>{if(t)return s=t.lastLimboFreeSnapshotVersion,e.Cs.getMatchingKeysForTargetId(i,t.targetId).next(e=>{r=e})}).next(()=>e.Li.getDocumentsMatchingQuery(i,t,n?s:F.min(),n?r:tL())).next(n=>{var s;let i;return s=t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2)),i=e.Ki.get(s)||F.min(),n.forEach((e,t)=>{t.readTime.compareTo(i)>0&&(i=t.readTime)}),e.Ki.set(s,i),{documents:n,Hi:r}}))}class nN{constructor(){this.activeTargetIds=tx}er(e){this.activeTargetIds=this.activeTargetIds.add(e)}nr(e){this.activeTargetIds=this.activeTargetIds.delete(e)}tr(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class nb{constructor(){this.Lr=new nN,this.qr={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e){return this.Lr.er(e),this.qr[e]||"not-current"}updateQueryState(e,t,n){this.qr[e]=t}removeLocalQueryTarget(e){this.Lr.nr(e)}isLocalQueryTarget(e){return this.Lr.activeTargetIds.has(e)}clearQueryState(e){delete this.qr[e]}getAllActiveQueryTargets(){return this.Lr.activeTargetIds}isActiveQueryTarget(e){return this.Lr.activeTargetIds.has(e)}start(){return this.Lr=new nN,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nD{Ur(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nR{constructor(){this.Kr=()=>this.Gr(),this.Qr=()=>this.jr(),this.Wr=[],this.zr()}Ur(e){this.Wr.push(e)}shutdown(){window.removeEventListener("online",this.Kr),window.removeEventListener("offline",this.Qr)}zr(){window.addEventListener("online",this.Kr),window.addEventListener("offline",this.Qr)}Gr(){for(let e of(g("ConnectivityMonitor","Network connectivity changed: AVAILABLE"),this.Wr))e(0)}jr(){for(let e of(g("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE"),this.Wr))e(1)}static C(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nL={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nx{constructor(e){this.Hr=e.Hr,this.Jr=e.Jr}Yr(e){this.Xr=e}Zr(e){this.eo=e}onMessage(e){this.no=e}close(){this.Jr()}send(e){this.Hr(e)}so(){this.Xr()}io(e){this.eo(e)}ro(e){this.no(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nV extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http";this.oo=t+"://"+e.host,this.uo="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}get co(){return!1}ao(e,t,n,s,r){let i=this.ho(e,t);g("RestConnection","Sending: ",i,n);let a={};return this.lo(a,s,r),this.fo(e,i,a,n).then(e=>(g("RestConnection","Received: ",e),e),t=>{throw y("RestConnection",`${e} failed with error: `,t,"url: ",i,"request:",n),t})}_o(e,t,n,s,r,i){return this.ao(e,t,n,s,r)}lo(e,t,n){e["X-Goog-Api-Client"]="gl-js/ fire/"+d,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((t,n)=>e[n]=t),n&&n.headers.forEach((t,n)=>e[n]=t)}ho(e,t){let n=nL[e];return`${this.oo}/v1/${t}:${n}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams}fo(e,t,n,s){return new Promise((r,i)=>{let a=new u.JJ;a.setWithCredentials(!0),a.listenOnce(u.tw.COMPLETE,()=>{try{switch(a.getLastErrorCode()){case u.jK.NO_ERROR:let t=a.getResponseJson();g("Connection","XHR received:",JSON.stringify(t)),r(t);break;case u.jK.TIMEOUT:g("Connection",'RPC "'+e+'" timed out'),i(new T(E.DEADLINE_EXCEEDED,"Request time out"));break;case u.jK.HTTP_ERROR:let n=a.getStatus();if(g("Connection",'RPC "'+e+'" failed with status:',n,"response text:",a.getResponseText()),n>0){let e=a.getResponseJson();Array.isArray(e)&&(e=e[0]);let t=null==e?void 0:e.error;if(t&&t.status&&t.message){let e=function(e){let t=e.toLowerCase().replace(/_/g,"-");return Object.values(E).indexOf(t)>=0?t:E.UNKNOWN}(t.status);i(new T(e,t.message))}else i(new T(E.UNKNOWN,"Server responded with status "+a.getStatus()))}else i(new T(E.UNAVAILABLE,"Connection failed."));break;default:v()}}finally{g("Connection",'RPC "'+e+'" completed.')}});let o=JSON.stringify(s);a.send(t,"POST",o,n,15)})}wo(e,t,n){let r=[this.oo,"/","google.firestore.v1.Firestore","/",e,"/channel"],i=(0,u.UE)(),a=(0,u.FJ)(),o={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};this.useFetchStreams&&(o.xmlHttpFactory=new u.zI({})),this.lo(o.initMessageHeaders,t,n),o.encodeInitMessageHeaders=!0;let l=r.join("");g("Connection","Creating WebChannel: "+l,o);let h=i.createWebChannel(l,o),c=!1,d=!1,f=new nx({Hr:e=>{d?g("Connection","Not sending because WebChannel is closed:",e):(c||(g("Connection","Opening WebChannel transport."),h.open(),c=!0),g("Connection","WebChannel sending:",e),h.send(e))},Jr:()=>h.close()}),m=(e,t,n)=>{e.listen(t,e=>{try{n(e)}catch(e){setTimeout(()=>{throw e},0)}})};return m(h,u.ii.EventType.OPEN,()=>{d||g("Connection","WebChannel transport opened.")}),m(h,u.ii.EventType.CLOSE,()=>{d||(d=!0,g("Connection","WebChannel transport closed"),f.io())}),m(h,u.ii.EventType.ERROR,e=>{d||(d=!0,y("Connection","WebChannel transport errored:",e),f.io(new T(E.UNAVAILABLE,"The operation could not be completed")))}),m(h,u.ii.EventType.MESSAGE,e=>{var t;if(!d){let n=e.data[0];n||v();let r=n.error||(null===(t=n[0])||void 0===t?void 0:t.error);if(r){g("Connection","WebChannel received error:",r);let e=r.status,t=function(e){let t=s[e];if(void 0!==t)return tC(t)}(e),n=r.message;void 0===t&&(t=E.INTERNAL,n="Unknown error status: "+e+" with message "+r.message),d=!0,f.io(new T(t,n)),h.close()}else g("Connection","WebChannel received:",n),f.ro(n)}}),m(a,u.ju.STAT_EVENT,e=>{e.stat===u.kN.PROXY?g("Connection","Detected buffering proxy"):e.stat===u.kN.NOPROXY&&g("Connection","Detected no buffering proxy")}),setTimeout(()=>{f.so()},0),f}}function nF(){return"undefined"!=typeof document?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nM(e){return new t$(e,!0)}class nO{constructor(e,t,n=1e3,s=1.5,r=6e4){this.Hs=e,this.timerId=t,this.mo=n,this.yo=s,this.po=r,this.Io=0,this.To=null,this.Eo=Date.now(),this.reset()}reset(){this.Io=0}Ao(){this.Io=this.po}Ro(e){this.cancel();let t=Math.floor(this.Io+this.bo()),n=Math.max(0,Date.now()-this.Eo),s=Math.max(0,t-n);s>0&&g("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Io} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.To=this.Hs.enqueueAfterDelay(this.timerId,s,()=>(this.Eo=Date.now(),e())),this.Io*=this.yo,this.Io<this.mo&&(this.Io=this.mo),this.Io>this.po&&(this.Io=this.po)}Po(){null!==this.To&&(this.To.skipDelay(),this.To=null)}cancel(){null!==this.To&&(this.To.cancel(),this.To=null)}bo(){return(Math.random()-.5)*this.Io}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nU{constructor(e,t,n,s,r,i,a,o){this.Hs=e,this.vo=n,this.Vo=s,this.connection=r,this.authCredentialsProvider=i,this.appCheckCredentialsProvider=a,this.listener=o,this.state=0,this.So=0,this.Do=null,this.Co=null,this.stream=null,this.xo=new nO(e,t)}No(){return 1===this.state||5===this.state||this.ko()}ko(){return 2===this.state||3===this.state}start(){4!==this.state?this.auth():this.Oo()}async stop(){this.No()&&await this.close(0)}Mo(){this.state=0,this.xo.reset()}Fo(){this.ko()&&null===this.Do&&(this.Do=this.Hs.enqueueAfterDelay(this.vo,6e4,()=>this.$o()))}Bo(e){this.Lo(),this.stream.send(e)}async $o(){if(this.ko())return this.close(0)}Lo(){this.Do&&(this.Do.cancel(),this.Do=null)}qo(){this.Co&&(this.Co.cancel(),this.Co=null)}async close(e,t){this.Lo(),this.qo(),this.xo.cancel(),this.So++,4!==e?this.xo.reset():t&&t.code===E.RESOURCE_EXHAUSTED?(p(t.toString()),p("Using maximum backoff delay to prevent overloading the backend."),this.xo.Ao()):t&&t.code===E.UNAUTHENTICATED&&3!==this.state&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),null!==this.stream&&(this.Uo(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Zr(t)}Uo(){}auth(){this.state=1;let e=this.Ko(this.So),t=this.So;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([e,n])=>{this.So===t&&this.Go(e,n)},t=>{e(()=>{let e=new T(E.UNKNOWN,"Fetching auth token failed: "+t.message);return this.Qo(e)})})}Go(e,t){let n=this.Ko(this.So);this.stream=this.jo(e,t),this.stream.Yr(()=>{n(()=>(this.state=2,this.Co=this.Hs.enqueueAfterDelay(this.Vo,1e4,()=>(this.ko()&&(this.state=3),Promise.resolve())),this.listener.Yr()))}),this.stream.Zr(e=>{n(()=>this.Qo(e))}),this.stream.onMessage(e=>{n(()=>this.onMessage(e))})}Oo(){this.state=5,this.xo.Ro(async()=>{this.state=0,this.start()})}Qo(e){return g("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}Ko(e){return t=>{this.Hs.enqueueAndForget(()=>this.So===e?t():(g("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class nP extends nU{constructor(e,t,n,s,r,i){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,s,i),this.yt=r}jo(e,t){return this.connection.wo("Listen",e,t)}onMessage(e){this.xo.reset();let t=function(e,t){let n;if("targetChange"in t){var s,r;t.targetChange;let i="NO_CHANGE"===(s=t.targetChange.targetChangeType||"NO_CHANGE")?0:"ADD"===s?1:"REMOVE"===s?2:"CURRENT"===s?3:"RESET"===s?4:v(),a=t.targetChange.targetIds||[],o=(r=t.targetChange.resumeToken,e.wt?(void 0===r||"string"==typeof r||v(),Z.fromBase64String(r||"")):(void 0===r||r instanceof Uint8Array||v(),Z.fromUint8Array(r||new Uint8Array))),l=t.targetChange.cause,u=l&&function(e){let t=void 0===e.code?E.UNKNOWN:tC(e.code);return new T(t,e.message||"")}(l);n=new tU(i,a,o,u||null)}else if("documentChange"in t){t.documentChange;let s=t.documentChange;s.document,s.document.name,s.document.updateTime;let r=tZ(e,s.document.name),i=tH(s.document.updateTime),a=s.document.createTime?tH(s.document.createTime):F.min(),o=new eQ({mapValue:{fields:s.document.fields}}),l=ez.newFoundDocument(r,i,a,o),u=s.targetIds||[],h=s.removedTargetIds||[];n=new tM(u,h,l.key,l)}else if("documentDelete"in t){t.documentDelete;let s=t.documentDelete;s.document;let r=tZ(e,s.document),i=s.readTime?tH(s.readTime):F.min(),a=ez.newNoDocument(r,i),o=s.removedTargetIds||[];n=new tM([],o,a.key,a)}else if("documentRemove"in t){t.documentRemove;let s=t.documentRemove;s.document;let r=tZ(e,s.document),i=s.removedTargetIds||[];n=new tM([],i,r,null)}else{if(!("filter"in t))return v();{t.filter;let e=t.filter;e.targetId;let s=e.count||0,r=new tI(s),i=e.targetId;n=new tO(i,r)}}return n}(this.yt,e),n=function(e){if(!("targetChange"in e))return F.min();let t=e.targetChange;return t.targetIds&&t.targetIds.length?F.min():t.readTime?tH(t.readTime):F.min()}(e);return this.listener.Wo(t,n)}zo(e){let t={};t.database=t1(this.yt),t.addTarget=function(e,t){let n;let s=t.target;return(n=eH(s)?{documents:{documents:[t0(e,s.path)]}}:{query:function(e,t){var n,s,r;let i={structuredQuery:{}},a=t.path;null!==t.collectionGroup?(i.parent=t0(e,a),i.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(i.parent=t0(e,a.popLast()),i.structuredQuery.from=[{collectionId:a.lastSegment()}]);let o=function(e){if(0!==e.length)return function e(t){return t instanceof eS?function(e){if("=="===e.op){if(ep(e.value))return{unaryFilter:{field:t3(e.field),op:"IS_NAN"}};if(eg(e.value))return{unaryFilter:{field:t3(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(ep(e.value))return{unaryFilter:{field:t3(e.field),op:"IS_NOT_NAN"}};if(eg(e.value))return{unaryFilter:{field:t3(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:t3(e.field),op:tz[e.op],value:e.value}}}(t):t instanceof ek?function(t){let n=t.getFilters().map(t=>e(t));return 1===n.length?n[0]:{compositeFilter:{op:tG[t.op],filters:n}}}(t):v()}(ek.create(e,"and"))}(t.filters);o&&(i.structuredQuery.where=o);let l=function(e){if(0!==e.length)return e.map(e=>({field:t3(e.field),direction:tQ[e.dir]}))}(t.orderBy);l&&(i.structuredQuery.orderBy=l);let u=(s=t.limit,e.wt||null==s?s:{value:s});return null!==u&&(i.structuredQuery.limit=u),t.startAt&&(i.structuredQuery.startAt={before:(n=t.startAt).inclusive,values:n.position}),t.endAt&&(i.structuredQuery.endAt={before:!(r=t.endAt).inclusive,values:r.position}),i}(e,s)}).targetId=t.targetId,t.resumeToken.approximateByteSize()>0?n.resumeToken=tW(e,t.resumeToken):t.snapshotVersion.compareTo(F.min())>0&&(n.readTime=tj(e,t.snapshotVersion.toTimestamp())),n}(this.yt,e);let n=function(e,t){let n=function(e,t){switch(t){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return v()}}(0,t.purpose);return null==n?null:{"goog-listen-tags":n}}(this.yt,e);n&&(t.labels=n),this.Bo(t)}Ho(e){let t={};t.database=t1(this.yt),t.removeTarget=e,this.Bo(t)}}class nq extends nU{constructor(e,t,n,s,r,i){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,s,i),this.yt=r,this.Jo=!1}get Yo(){return this.Jo}start(){this.Jo=!1,this.lastStreamToken=void 0,super.start()}Uo(){this.Jo&&this.Xo([])}jo(e,t){return this.connection.wo("Write",e,t)}onMessage(e){var t,n;if(e.streamToken||v(),this.lastStreamToken=e.streamToken,this.Jo){this.xo.reset();let s=(t=e.writeResults,n=e.commitTime,t&&t.length>0?(void 0!==n||v(),t.map(e=>{let t;return(t=e.updateTime?tH(e.updateTime):tH(n)).isEqual(F.min())&&(t=tH(n)),new tl(t,e.transformResults||[])})):[]),r=tH(e.commitTime);return this.listener.Zo(r,s)}return e.writeResults&&0!==e.writeResults.length&&v(),this.Jo=!0,this.listener.tu()}eu(){let e={};e.database=t1(this.yt),this.Bo(e)}Xo(e){let t={streamToken:this.lastStreamToken,writes:e.map(e=>(function(e,t){var n;let s;if(t instanceof tg)s={update:t4(e,t.key,t.value)};else if(t instanceof tE)s={delete:tJ(e,t.key)};else if(t instanceof tp)s={update:t4(e,t.key,t.data),updateMask:function(e){let t=[];return e.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}(t.fieldMask)};else{if(!(t instanceof tT))return v();s={verify:tJ(e,t.key)}}return t.fieldTransforms.length>0&&(s.updateTransforms=t.fieldTransforms.map(e=>(function(e,t){let n=t.transform;if(n instanceof te)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof tt)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof ts)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof ti)return{fieldPath:t.field.canonicalString(),increment:n.gt};throw v()})(0,e))),t.precondition.isNone||(s.currentDocument=void 0!==(n=t.precondition).updateTime?{updateTime:tj(e,n.updateTime.toTimestamp())}:void 0!==n.exists?{exists:n.exists}:v()),s})(this.yt,e))};this.Bo(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nB extends class{}{constructor(e,t,n,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.yt=s,this.nu=!1}su(){if(this.nu)throw new T(E.FAILED_PRECONDITION,"The client has already been terminated.")}ao(e,t,n){return this.su(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,r])=>this.connection.ao(e,t,n,s,r)).catch(e=>{throw"FirebaseError"===e.name?(e.code===E.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new T(E.UNKNOWN,e.toString())})}_o(e,t,n,s){return this.su(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,i])=>this.connection._o(e,t,n,r,i,s)).catch(e=>{throw"FirebaseError"===e.name?(e.code===E.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),e):new T(E.UNKNOWN,e.toString())})}terminate(){this.nu=!0}}class nK{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.iu=0,this.ru=null,this.ou=!0}uu(){0===this.iu&&(this.cu("Unknown"),this.ru=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.ru=null,this.au("Backend didn't respond within 10 seconds."),this.cu("Offline"),Promise.resolve())))}hu(e){"Online"===this.state?this.cu("Unknown"):(this.iu++,this.iu>=1&&(this.lu(),this.au(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.cu("Offline")))}set(e){this.lu(),this.iu=0,"Online"===e&&(this.ou=!1),this.cu(e)}cu(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}au(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.ou?(p(t),this.ou=!1):g("OnlineStateTracker",t)}lu(){null!==this.ru&&(this.ru.cancel(),this.ru=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nQ{constructor(e,t,n,s,r){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.fu=[],this.du=new Map,this._u=new Set,this.wu=[],this.mu=r,this.mu.Ur(e=>{n.enqueueAndForget(async()=>{nJ(this)&&(g("RemoteStore","Restarting streams for network reachability change."),await async function(e){e._u.add(4),await nG(e),e.gu.set("Unknown"),e._u.delete(4),await nz(e)}(this))})}),this.gu=new nK(n,s)}}async function nz(e){if(nJ(e))for(let t of e.wu)await t(!0)}async function nG(e){for(let t of e.wu)await t(!1)}function n$(e,t){e.du.has(t.targetId)||(e.du.set(t.targetId,t),nX(e)?nY(e):ss(e).ko()&&nW(e,t))}function nj(e,t){let n=ss(e);e.du.delete(t),n.ko()&&nH(e,t),0===e.du.size&&(n.ko()?n.Fo():nJ(e)&&e.gu.set("Unknown"))}function nW(e,t){e.yu.Ot(t.targetId),ss(e).zo(t)}function nH(e,t){e.yu.Ot(t),ss(e).Ho(t)}function nY(e){e.yu=new tq({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),ne:t=>e.du.get(t)||null}),ss(e).start(),e.gu.uu()}function nX(e){return nJ(e)&&!ss(e).No()&&e.du.size>0}function nJ(e){return 0===e._u.size}async function nZ(e){e.du.forEach((t,n)=>{nW(e,t)})}async function n0(e,t){e.yu=void 0,nX(e)?(e.gu.hu(t),nY(e)):e.gu.set("Unknown")}async function n1(e,t,n){if(e.gu.set("Online"),t instanceof tU&&2===t.state&&t.cause)try{await async function(e,t){let n=t.cause;for(let s of t.targetIds)e.du.has(s)&&(await e.remoteSyncer.rejectListen(s,n),e.du.delete(s),e.yu.removeTarget(s))}(e,t)}catch(n){g("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),n),await n2(e,n)}else if(t instanceof tM?e.yu.Kt(t):t instanceof tO?e.yu.Jt(t):e.yu.jt(t),!n.isEqual(F.min()))try{let t=await nk(e.localStore);n.compareTo(t)>=0&&await function(e,t){let n=e.yu.Zt(t);return n.targetChanges.forEach((n,s)=>{if(n.resumeToken.approximateByteSize()>0){let r=e.du.get(s);r&&e.du.set(s,r.withResumeToken(n.resumeToken,t))}}),n.targetMismatches.forEach(t=>{let n=e.du.get(t);if(!n)return;e.du.set(t,n.withResumeToken(Z.EMPTY_BYTE_STRING,n.snapshotVersion)),nH(e,t);let s=new ne(n.target,t,1,n.sequenceNumber);nW(e,s)}),e.remoteSyncer.applyRemoteEvent(n)}(e,n)}catch(t){g("RemoteStore","Failed to raise snapshot:",t),await n2(e,t)}}async function n2(e,t,n){if(!G(t))throw t;e._u.add(1),await nG(e),e.gu.set("Offline"),n||(n=()=>nk(e.localStore)),e.asyncQueue.enqueueRetryable(async()=>{g("RemoteStore","Retrying IndexedDB access"),await n(),e._u.delete(1),await nz(e)})}function n4(e,t){return t().catch(n=>n2(e,n,t))}async function n3(e){let t=sr(e),n=e.fu.length>0?e.fu[e.fu.length-1].batchId:-1;for(;nJ(e)&&e.fu.length<10;)try{let s=await function(e,t){return e.persistence.runTransaction("Get next mutation batch","readonly",n=>(void 0===t&&(t=-1),e.mutationQueue.getNextMutationBatchAfterBatchId(n,t)))}(e.localStore,n);if(null===s){0===e.fu.length&&t.Fo();break}n=s.batchId,function(e,t){e.fu.push(t);let n=sr(e);n.ko()&&n.Yo&&n.Xo(t.mutations)}(e,s)}catch(t){await n2(e,t)}n9(e)&&n5(e)}function n9(e){return nJ(e)&&!sr(e).No()&&e.fu.length>0}function n5(e){sr(e).start()}async function n6(e){sr(e).eu()}async function n8(e){let t=sr(e);for(let n of e.fu)t.Xo(n.mutations)}async function n7(e,t,n){let s=e.fu.shift(),r=t8.from(s,t,n);await n4(e,()=>e.remoteSyncer.applySuccessfulWrite(r)),await n3(e)}async function se(e,t){t&&sr(e).Yo&&await async function(e,t){var n;if(function(e){switch(e){default:return v();case E.CANCELLED:case E.UNKNOWN:case E.DEADLINE_EXCEEDED:case E.RESOURCE_EXHAUSTED:case E.INTERNAL:case E.UNAVAILABLE:case E.UNAUTHENTICATED:return!1;case E.INVALID_ARGUMENT:case E.NOT_FOUND:case E.ALREADY_EXISTS:case E.PERMISSION_DENIED:case E.FAILED_PRECONDITION:case E.ABORTED:case E.OUT_OF_RANGE:case E.UNIMPLEMENTED:case E.DATA_LOSS:return!0}}(n=t.code)&&n!==E.ABORTED){let n=e.fu.shift();sr(e).Mo(),await n4(e,()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t)),await n3(e)}}(e,t),n9(e)&&n5(e)}async function st(e,t){e.asyncQueue.verifyOperationInProgress(),g("RemoteStore","RemoteStore received new credentials");let n=nJ(e);e._u.add(3),await nG(e),n&&e.gu.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e._u.delete(3),await nz(e)}async function sn(e,t){t?(e._u.delete(2),await nz(e)):t||(e._u.add(2),await nG(e),e.gu.set("Unknown"))}function ss(e){var t,n,s;return e.pu||(e.pu=(t=e.datastore,n=e.asyncQueue,s={Yr:nZ.bind(null,e),Zr:n0.bind(null,e),Wo:n1.bind(null,e)},t.su(),new nP(n,t.connection,t.authCredentials,t.appCheckCredentials,t.yt,s)),e.wu.push(async t=>{t?(e.pu.Mo(),nX(e)?nY(e):e.gu.set("Unknown")):(await e.pu.stop(),e.yu=void 0)})),e.pu}function sr(e){var t,n,s;return e.Iu||(e.Iu=(t=e.datastore,n=e.asyncQueue,s={Yr:n6.bind(null,e),Zr:se.bind(null,e),tu:n8.bind(null,e),Zo:n7.bind(null,e)},t.su(),new nq(n,t.connection,t.authCredentials,t.appCheckCredentials,t.yt,s)),e.wu.push(async t=>{t?(e.Iu.Mo(),await n3(e)):(await e.Iu.stop(),e.fu.length>0&&(g("RemoteStore",`Stopping write stream with ${e.fu.length} pending writes`),e.fu=[]))})),e.Iu}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class si{constructor(e,t,n,s,r){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=s,this.removalCallback=r,this.deferred=new I,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(e=>{})}static createAndSchedule(e,t,n,s,r){let i=Date.now()+n,a=new si(e,t,i,s,r);return a.start(n),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new T(E.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function sa(e,t){if(p("AsyncQueue",`${t}: ${e}`),G(e))return new T(E.UNAVAILABLE,`${t}: ${e}`);throw e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class so{constructor(e){this.comparator=e?(t,n)=>e(t,n)||q.comparator(t.key,n.key):(e,t)=>q.comparator(e.key,t.key),this.keyedMap=t_(),this.sortedSet=new eO(this.comparator)}static emptySet(e){return new so(e.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof so)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){let e=t.getNext().key,s=n.getNext().key;if(!e.isEqual(s))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){let n=new so;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sl{constructor(){this.Tu=new eO(q.comparator)}track(e){let t=e.doc.key,n=this.Tu.get(t);n?0!==e.type&&3===n.type?this.Tu=this.Tu.insert(t,e):3===e.type&&1!==n.type?this.Tu=this.Tu.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.Tu=this.Tu.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.Tu=this.Tu.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.Tu=this.Tu.remove(t):1===e.type&&2===n.type?this.Tu=this.Tu.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.Tu=this.Tu.insert(t,{type:2,doc:e.doc}):v():this.Tu=this.Tu.insert(t,e)}Eu(){let e=[];return this.Tu.inorderTraversal((t,n)=>{e.push(n)}),e}}class su{constructor(e,t,n,s,r,i,a,o,l){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=r,this.fromCache=i,this.syncStateChanged=a,this.excludesMetadataChanges=o,this.hasCachedResults=l}static fromInitialDocuments(e,t,n,s,r){let i=[];return t.forEach(e=>{i.push({type:0,doc:e})}),new su(e,t,so.emptySet(t),i,n,s,!0,!1,r)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&e1(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let e=0;e<t.length;e++)if(t[e].type!==n[e].type||!t[e].doc.isEqual(n[e].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sh{constructor(){this.Au=void 0,this.listeners=[]}}class sc{constructor(){this.queries=new tS(e=>e2(e),e1),this.onlineState="Unknown",this.Ru=new Set}}async function sd(e,t){let n=t.query,s=!1,r=e.queries.get(n);if(r||(s=!0,r=new sh),s)try{r.Au=await e.onListen(n)}catch(n){let e=sa(n,`Initialization of query '${e4(t.query)}' failed`);return void t.onError(e)}e.queries.set(n,r),r.listeners.push(t),t.bu(e.onlineState),r.Au&&t.Pu(r.Au)&&sp(e)}async function sf(e,t){let n=t.query,s=!1,r=e.queries.get(n);if(r){let e=r.listeners.indexOf(t);e>=0&&(r.listeners.splice(e,1),s=0===r.listeners.length)}if(s)return e.queries.delete(n),e.onUnlisten(n)}function sm(e,t){let n=!1;for(let s of t){let t=s.query,r=e.queries.get(t);if(r){for(let e of r.listeners)e.Pu(s)&&(n=!0);r.Au=s}}n&&sp(e)}function sg(e,t,n){let s=e.queries.get(t);if(s)for(let e of s.listeners)e.onError(n);e.queries.delete(t)}function sp(e){e.Ru.forEach(e=>{e.next()})}class sy{constructor(e,t,n){this.query=e,this.vu=t,this.Vu=!1,this.Su=null,this.onlineState="Unknown",this.options=n||{}}Pu(e){if(!this.options.includeMetadataChanges){let t=[];for(let n of e.docChanges)3!==n.type&&t.push(n);e=new su(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Vu?this.Du(e)&&(this.vu.next(e),t=!0):this.Cu(e,this.onlineState)&&(this.xu(e),t=!0),this.Su=e,t}onError(e){this.vu.error(e)}bu(e){this.onlineState=e;let t=!1;return this.Su&&!this.Vu&&this.Cu(this.Su,e)&&(this.xu(this.Su),t=!0),t}Cu(e,t){return!e.fromCache||(!this.options.Nu||!("Offline"!==t))&&(!e.docs.isEmpty()||e.hasCachedResults||"Offline"===t)}Du(e){if(e.docChanges.length>0)return!0;let t=this.Su&&this.Su.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}xu(e){e=su.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Vu=!0,this.vu.next(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sw{constructor(e){this.key=e}}class sv{constructor(e){this.key=e}}class sE{constructor(e,t){this.query=e,this.qu=t,this.Uu=null,this.hasCachedResults=!1,this.current=!1,this.Ku=tL(),this.mutatedKeys=tL(),this.Gu=e9(e),this.Qu=new so(this.Gu)}get ju(){return this.qu}Wu(e,t){let n=t?t.zu:new sl,s=t?t.Qu:this.Qu,r=t?t.mutatedKeys:this.mutatedKeys,i=s,a=!1,o="F"===this.query.limitType&&s.size===this.query.limit?s.last():null,l="L"===this.query.limitType&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((e,t)=>{let u=s.get(e),h=e3(this.query,t)?t:null,c=!!u&&this.mutatedKeys.has(u.key),d=!!h&&(h.hasLocalMutations||this.mutatedKeys.has(h.key)&&h.hasCommittedMutations),f=!1;u&&h?u.data.isEqual(h.data)?c!==d&&(n.track({type:3,doc:h}),f=!0):this.Hu(u,h)||(n.track({type:2,doc:h}),f=!0,(o&&this.Gu(h,o)>0||l&&0>this.Gu(h,l))&&(a=!0)):!u&&h?(n.track({type:0,doc:h}),f=!0):u&&!h&&(n.track({type:1,doc:u}),f=!0,(o||l)&&(a=!0)),f&&(h?(i=i.add(h),r=d?r.add(e):r.delete(e)):(i=i.delete(e),r=r.delete(e)))}),null!==this.query.limit)for(;i.size>this.query.limit;){let e="F"===this.query.limitType?i.last():i.first();i=i.delete(e.key),r=r.delete(e.key),n.track({type:1,doc:e})}return{Qu:i,zu:n,$i:a,mutatedKeys:r}}Hu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n){let s=this.Qu;this.Qu=e.Qu,this.mutatedKeys=e.mutatedKeys;let r=e.zu.Eu();r.sort((e,t)=>(function(e,t){let n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return v()}};return n(e)-n(t)})(e.type,t.type)||this.Gu(e.doc,t.doc)),this.Ju(n);let i=t?this.Yu():[],a=0===this.Ku.size&&this.current?1:0,o=a!==this.Uu;return(this.Uu=a,0!==r.length||o)?{snapshot:new su(this.query,e.Qu,s,r,e.mutatedKeys,0===a,o,!1,!!n&&n.resumeToken.approximateByteSize()>0),Xu:i}:{Xu:i}}bu(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({Qu:this.Qu,zu:new sl,mutatedKeys:this.mutatedKeys,$i:!1},!1)):{Xu:[]}}Zu(e){return!this.qu.has(e)&&!!this.Qu.has(e)&&!this.Qu.get(e).hasLocalMutations}Ju(e){e&&(e.addedDocuments.forEach(e=>this.qu=this.qu.add(e)),e.modifiedDocuments.forEach(e=>{}),e.removedDocuments.forEach(e=>this.qu=this.qu.delete(e)),this.current=e.current)}Yu(){if(!this.current)return[];let e=this.Ku;this.Ku=tL(),this.Qu.forEach(e=>{this.Zu(e.key)&&(this.Ku=this.Ku.add(e.key))});let t=[];return e.forEach(e=>{this.Ku.has(e)||t.push(new sv(e))}),this.Ku.forEach(n=>{e.has(n)||t.push(new sw(n))}),t}tc(e){this.qu=e.Hi,this.Ku=tL();let t=this.Wu(e.documents);return this.applyChanges(t,!0)}ec(){return su.fromInitialDocuments(this.query,this.Qu,this.mutatedKeys,0===this.Uu,this.hasCachedResults)}}class sT{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class sI{constructor(e){this.key=e,this.nc=!1}}class sC{constructor(e,t,n,s,r,i){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=s,this.currentUser=r,this.maxConcurrentLimboResolutions=i,this.sc={},this.ic=new tS(e=>e2(e),e1),this.rc=new Map,this.oc=new Set,this.uc=new eO(q.comparator),this.cc=new Map,this.ac=new nd,this.hc={},this.lc=new Map,this.fc=na.vn(),this.onlineState="Unknown",this.dc=void 0}get isPrimaryClient(){return!0===this.dc}}async function sS(e,t){let n,s;let r=function(e){let t=e;return t.remoteStore.remoteSyncer.applyRemoteEvent=sN.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=sB.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=sD.bind(null,t),t.sc.Wo=sm.bind(null,t.eventManager),t.sc.wc=sg.bind(null,t.eventManager),t}(e),i=r.ic.get(t);if(i)n=i.targetId,r.sharedClientState.addLocalQueryTarget(n),s=i.view.ec();else{let e=await function(e,t){let n=e;return n.persistence.runTransaction("Allocate target","readwrite",e=>{let s;return n.Cs.getTargetData(e,t).next(r=>r?(s=r,z.resolve(s)):n.Cs.allocateTargetId(e).next(r=>(s=new ne(t,r,0,e.currentSequenceNumber),n.Cs.addTargetData(e,s).next(()=>s))))}).then(e=>{let s=n.qi.get(e.targetId);return(null===s||e.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.qi=n.qi.insert(e.targetId,e),n.Ui.set(t,e.targetId)),e})}(r.localStore,eZ(t));r.isPrimaryClient&&n$(r.remoteStore,e);let i=r.sharedClientState.addLocalQueryTarget(e.targetId);s=await sk(r,t,n=e.targetId,"current"===i,e.resumeToken)}return s}async function sk(e,t,n,s,r){e._c=(t,n,s)=>(async function(e,t,n,s){let r=t.view.Wu(n);r.$i&&(r=await n_(e.localStore,t.query,!1).then(({documents:e})=>t.view.Wu(e,r)));let i=s&&s.targetChanges.get(t.targetId),a=t.view.applyChanges(r,e.isPrimaryClient,i);return sO(e,t.targetId,a.Xu),a.snapshot})(e,t,n,s);let i=await n_(e.localStore,t,!0),a=new sE(t,i.Hi),o=a.Wu(i.documents),l=tF.createSynthesizedTargetChangeForCurrentChange(n,s&&"Offline"!==e.onlineState,r),u=a.applyChanges(o,e.isPrimaryClient,l);sO(e,n,u.Xu);let h=new sT(t,n,a);return e.ic.set(t,h),e.rc.has(n)?e.rc.get(n).push(t):e.rc.set(n,[t]),u.snapshot}async function sA(e,t){let n=e.ic.get(t),s=e.rc.get(n.targetId);if(s.length>1)return e.rc.set(n.targetId,s.filter(e=>!e1(e,t))),void e.ic.delete(t);e.isPrimaryClient?(e.sharedClientState.removeLocalQueryTarget(n.targetId),e.sharedClientState.isActiveQueryTarget(n.targetId)||await nA(e.localStore,n.targetId,!1).then(()=>{e.sharedClientState.clearQueryState(n.targetId),nj(e.remoteStore,n.targetId),sF(e,n.targetId)}).catch(Q)):(sF(e,n.targetId),await nA(e.localStore,n.targetId,!0))}async function s_(e,t,n){let s=function(e){let t=e;return t.remoteStore.remoteSyncer.applySuccessfulWrite=sR.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=sL.bind(null,t),t}(e);try{var r,i;let e;let a=await function(e,t){let n,s;let r=V.now(),i=t.reduce((e,t)=>e.add(t.key),tL());return e.persistence.runTransaction("Locally write mutations","readwrite",a=>{let o=tk,l=tL();return e.Gi.getEntries(a,i).next(e=>{(o=e).forEach((e,t)=>{t.isValidDocument()||(l=l.add(e))})}).next(()=>e.localDocuments.getOverlayedDocuments(a,o)).next(s=>{n=s;let i=[];for(let e of t){let t=function(e,t){let n=null;for(let s of e.fieldTransforms){let e=t.data.field(s.field),r=e7(s.transform,e||null);null!=r&&(null===n&&(n=eQ.empty()),n.set(s.field,r))}return n||null}(e,n.get(e.key).overlayedDocument);null!=t&&i.push(new tp(e.key,t,function e(t){let n=[];return Y(t.fields,(t,s)=>{let r=new P([t]);if(ey(s)){let t=e(s.mapValue).fields;if(0===t.length)n.push(r);else for(let e of t)n.push(r.child(e))}else n.push(r)}),new eK(n)}(t.value.mapValue),tu.exists(!0)))}return e.mutationQueue.addMutationBatch(a,r,i,t)}).next(t=>{s=t;let r=t.applyToLocalDocumentSet(n,l);return e.documentOverlayCache.saveOverlays(a,t.batchId,r)})}).then(()=>({batchId:s.batchId,changes:tN(n)}))}(s.localStore,t);s.sharedClientState.addPendingMutation(a.batchId),r=s,i=a.batchId,(e=r.hc[r.currentUser.toKey()])||(e=new eO(L)),e=e.insert(i,n),r.hc[r.currentUser.toKey()]=e,await sP(s,a.changes),await n3(s.remoteStore)}catch(t){let e=sa(t,"Failed to persist write");n.reject(e)}}async function sN(e,t){try{let n=await function(e,t){let n=e,s=t.snapshotVersion,r=n.qi;return n.persistence.runTransaction("Apply remote event","readwrite-primary",e=>{var i;let a,o;let l=n.Gi.newChangeBuffer({trackRemovals:!0});r=n.qi;let u=[];t.targetChanges.forEach((i,a)=>{var o;let l=r.get(a);if(!l)return;u.push(n.Cs.removeMatchingKeys(e,i.removedDocuments,a).next(()=>n.Cs.addMatchingKeys(e,i.addedDocuments,a)));let h=l.withSequenceNumber(e.currentSequenceNumber);t.targetMismatches.has(a)?h=h.withResumeToken(Z.EMPTY_BYTE_STRING,F.min()).withLastLimboFreeSnapshotVersion(F.min()):i.resumeToken.approximateByteSize()>0&&(h=h.withResumeToken(i.resumeToken,s)),r=r.insert(a,h),o=h,(0===l.resumeToken.approximateByteSize()||o.snapshotVersion.toMicroseconds()-l.snapshotVersion.toMicroseconds()>=3e8||i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size>0)&&u.push(n.Cs.updateTargetData(e,h))});let h=tk,c=tL();if(t.documentUpdates.forEach(s=>{t.resolvedLimboDocuments.has(s)&&u.push(n.persistence.referenceDelegate.updateLimboDocument(e,s))}),u.push((i=t.documentUpdates,a=tL(),o=tL(),i.forEach(e=>a=a.add(e)),l.getEntries(e,a).next(e=>{let t=tk;return i.forEach((n,s)=>{let r=e.get(n);s.isFoundDocument()!==r.isFoundDocument()&&(o=o.add(n)),s.isNoDocument()&&s.version.isEqual(F.min())?(l.removeEntry(n,s.readTime),t=t.insert(n,s)):!r.isValidDocument()||s.version.compareTo(r.version)>0||0===s.version.compareTo(r.version)&&r.hasPendingWrites?(l.addEntry(s),t=t.insert(n,s)):g("LocalStore","Ignoring outdated watch update for ",n,". Current version:",r.version," Watch version:",s.version)}),{Wi:t,zi:o}})).next(e=>{h=e.Wi,c=e.zi})),!s.isEqual(F.min())){let t=n.Cs.getLastRemoteSnapshotVersion(e).next(t=>n.Cs.setTargetsMetadata(e,e.currentSequenceNumber,s));u.push(t)}return z.waitFor(u).next(()=>l.apply(e)).next(()=>n.localDocuments.getLocalViewOfDocuments(e,h,c)).next(()=>h)}).then(e=>(n.qi=r,e))}(e.localStore,t);t.targetChanges.forEach((t,n)=>{let s=e.cc.get(n);s&&(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1||v(),t.addedDocuments.size>0?s.nc=!0:t.modifiedDocuments.size>0?s.nc||v():t.removedDocuments.size>0&&(s.nc||v(),s.nc=!1))}),await sP(e,n,t)}catch(e){await Q(e)}}function sb(e,t,n){let s=e;if(s.isPrimaryClient&&0===n||!s.isPrimaryClient&&1===n){let e=[];s.ic.forEach((n,s)=>{let r=s.view.bu(t);r.snapshot&&e.push(r.snapshot)}),function(e,t){let n=e;n.onlineState=t;let s=!1;n.queries.forEach((e,n)=>{for(let e of n.listeners)e.bu(t)&&(s=!0)}),s&&sp(n)}(s.eventManager,t),e.length&&s.sc.Wo(e),s.onlineState=t,s.isPrimaryClient&&s.sharedClientState.setOnlineState(t)}}async function sD(e,t,n){let s=e;s.sharedClientState.updateQueryState(t,"rejected",n);let r=s.cc.get(t),i=r&&r.key;if(i){let e=new eO(q.comparator);e=e.insert(i,ez.newNoDocument(i,F.min()));let n=tL().add(i),r=new tV(F.min(),new Map,new eq(L),e,n);await sN(s,r),s.uc=s.uc.remove(i),s.cc.delete(t),sU(s)}else await nA(s.localStore,t,!1).then(()=>sF(s,t,n)).catch(Q)}async function sR(e,t){var n;let s=t.batch.batchId;try{let r=await (n=e.localStore).persistence.runTransaction("Acknowledge batch","readwrite-primary",e=>{let s=t.batch.keys(),r=n.Gi.newChangeBuffer({trackRemovals:!0});return(function(e,t,n,s){let r=n.batch,i=r.keys(),a=z.resolve();return i.forEach(e=>{a=a.next(()=>s.getEntry(t,e)).next(t=>{let i=n.docVersions.get(e);null!==i||v(),0>t.version.compareTo(i)&&(r.applyToRemoteDocument(t,n),t.isValidDocument()&&(t.setReadTime(n.commitVersion),s.addEntry(t)))})}),a.next(()=>e.mutationQueue.removeMutationBatch(t,r))})(n,e,t,r).next(()=>r.apply(e)).next(()=>n.mutationQueue.performConsistencyCheck(e)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(e,s,t.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,function(e){let t=tL();for(let n=0;n<e.mutationResults.length;++n)e.mutationResults[n].transformResults.length>0&&(t=t.add(e.batch.mutations[n].key));return t}(t))).next(()=>n.localDocuments.getDocuments(e,s))});sV(e,s,null),sx(e,s),e.sharedClientState.updateMutationState(s,"acknowledged"),await sP(e,r)}catch(e){await Q(e)}}async function sL(e,t,n){var s;try{let r=await (s=e.localStore).persistence.runTransaction("Reject batch","readwrite-primary",e=>{let n;return s.mutationQueue.lookupMutationBatch(e,t).next(t=>(null!==t||v(),n=t.keys(),s.mutationQueue.removeMutationBatch(e,t))).next(()=>s.mutationQueue.performConsistencyCheck(e)).next(()=>s.documentOverlayCache.removeOverlaysForBatchId(e,n,t)).next(()=>s.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(e,n)).next(()=>s.localDocuments.getDocuments(e,n))});sV(e,t,n),sx(e,t),e.sharedClientState.updateMutationState(t,"rejected",n),await sP(e,r)}catch(e){await Q(e)}}function sx(e,t){(e.lc.get(t)||[]).forEach(e=>{e.resolve()}),e.lc.delete(t)}function sV(e,t,n){let s=e,r=s.hc[s.currentUser.toKey()];if(r){let e=r.get(t);e&&(n?e.reject(n):e.resolve(),r=r.remove(t)),s.hc[s.currentUser.toKey()]=r}}function sF(e,t,n=null){for(let s of(e.sharedClientState.removeLocalQueryTarget(t),e.rc.get(t)))e.ic.delete(s),n&&e.sc.wc(s,n);e.rc.delete(t),e.isPrimaryClient&&e.ac.ls(t).forEach(t=>{e.ac.containsKey(t)||sM(e,t)})}function sM(e,t){e.oc.delete(t.path.canonicalString());let n=e.uc.get(t);null!==n&&(nj(e.remoteStore,n),e.uc=e.uc.remove(t),e.cc.delete(n),sU(e))}function sO(e,t,n){for(let s of n)s instanceof sw?(e.ac.addReference(s.key,t),function(e,t){let n=t.key,s=n.path.canonicalString();e.uc.get(n)||e.oc.has(s)||(g("SyncEngine","New document in limbo: "+n),e.oc.add(s),sU(e))}(e,s)):s instanceof sv?(g("SyncEngine","Document no longer in limbo: "+s.key),e.ac.removeReference(s.key,t),e.ac.containsKey(s.key)||sM(e,s.key)):v()}function sU(e){for(;e.oc.size>0&&e.uc.size<e.maxConcurrentLimboResolutions;){var t;let n=e.oc.values().next().value;e.oc.delete(n);let s=new q(O.fromString(n)),r=e.fc.next();e.cc.set(r,new sI(s)),e.uc=e.uc.insert(s,r),n$(e.remoteStore,new ne(eZ((t=s.path,new eY(t))),r,2,$.at))}}async function sP(e,t,n){let s=[],r=[],i=[];e.ic.isEmpty()||(e.ic.forEach((a,o)=>{i.push(e._c(o,t,n).then(t=>{if((t||n)&&e.isPrimaryClient&&e.sharedClientState.updateQueryState(o.targetId,(null==t?void 0:t.fromCache)?"not-current":"current"),t){s.push(t);let e=nT.Ci(o.targetId,t);r.push(e)}}))}),await Promise.all(i),e.sc.Wo(s),await async function(e,t){let n=e;try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",e=>z.forEach(t,t=>z.forEach(t.Si,s=>n.persistence.referenceDelegate.addReference(e,t.targetId,s)).next(()=>z.forEach(t.Di,s=>n.persistence.referenceDelegate.removeReference(e,t.targetId,s)))))}catch(e){if(!G(e))throw e;g("LocalStore","Failed to update sequence numbers: "+e)}for(let e of t){let t=e.targetId;if(!e.fromCache){let e=n.qi.get(t),s=e.snapshotVersion,r=e.withLastLimboFreeSnapshotVersion(s);n.qi=n.qi.insert(t,r)}}}(e.localStore,r))}async function sq(e,t){let n=e;if(!n.currentUser.isEqual(t)){g("SyncEngine","User change. New user:",t.toKey());let e=await nS(n.localStore,t);n.currentUser=t,n.lc.forEach(e=>{e.forEach(e=>{e.reject(new T(E.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))})}),n.lc.clear(),n.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),await sP(n,e.ji)}}function sB(e,t){let n=e.cc.get(t);if(n&&n.nc)return tL().add(n.key);{let n=tL(),s=e.rc.get(t);if(!s)return n;for(let t of s){let s=e.ic.get(t);n=n.unionWith(s.view.ju)}return n}}class sK{constructor(){this.synchronizeTabs=!1}async initialize(e){this.yt=nM(e.databaseInfo.databaseId),this.sharedClientState=this.gc(e),this.persistence=this.yc(e),await this.persistence.start(),this.localStore=this.Ic(e),this.gcScheduler=this.Tc(e,this.localStore),this.indexBackfillerScheduler=this.Ec(e,this.localStore)}Tc(e,t){return null}Ec(e,t){return null}Ic(e){var t,n,s,r;return t=this.persistence,n=new nI,s=e.initialUser,r=this.yt,new nC(t,n,s,r)}yc(e){return new nw(nE.Bs,this.yt)}gc(e){return new nb}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class sQ{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>sb(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=sq.bind(null,this.syncEngine),await sn(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new sc}createDatastore(e){var t,n,s;let r=nM(e.databaseInfo.databaseId),i=(t=e.databaseInfo,new nV(t));return n=e.authCredentials,s=e.appCheckCredentials,new nB(n,s,i,r)}createRemoteStore(e){var t,n,s,r,i;return t=this.localStore,n=this.datastore,s=e.asyncQueue,r=e=>sb(this.syncEngine,e,0),i=nR.C()?new nR:new nD,new nQ(t,n,s,r,i)}createSyncEngine(e,t){return function(e,t,n,s,r,i,a){let o=new sC(e,t,n,s,r,i);return a&&(o.dc=!0),o}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}terminate(){return async function(e){g("RemoteStore","RemoteStore shutting down."),e._u.add(5),await nG(e),e.mu.shutdown(),e.gu.set("Unknown")}(this.remoteStore)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sz(e,t,n){if(!n)throw new T(E.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function sG(e){if(!q.isDocumentKey(e))throw new T(E.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function s$(e){if(q.isDocumentKey(e))throw new T(E.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function sj(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{var t;let n=(t=e).constructor?t.constructor.name:null;return n?`a custom ${n} object`:"an object"}}return"function"==typeof e?"a function":v()}function sW(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new T(E.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let n=sj(e);throw new T(E.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sH=new Map;class sY{constructor(e){var t;if(void 0===e.host){if(void 0!==e.ssl)throw new T(E.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=null===(t=e.ssl)||void 0===t||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,void 0===e.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new T(E.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.useFetchStreams=!!e.useFetchStreams,function(e,t,n,s){if(!0===t&&!0===s)throw new T(E.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling)}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sX{constructor(e,t,n,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new sY({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new T(E.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return void 0!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new T(E.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new sY(e),void 0!==e.credentials&&(this._authCredentials=function(e){if(!e)return new S;switch(e.type){case"gapi":let t=e.client;return new N(t,e.sessionIndex||"0",e.iamToken||null,e.authTokenFactory||null);case"provider":return e.client;default:throw new T(E.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){let t=sH.get(e);t&&(g("ComponentProvider","Removing Datastore"),sH.delete(e),t.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sJ{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new s0(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new sJ(this.firestore,e,this._key)}}class sZ{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new sZ(this.firestore,e,this._query)}}class s0 extends sZ{constructor(e,t,n){super(e,t,new eY(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new sJ(this.firestore,null,new q(e))}withConverter(e){return new s0(this.firestore,e,this._path)}}function s1(e,t,...n){if(e=(0,l.m9)(e),sz("collection","path",t),e instanceof sX){let s=O.fromString(t,...n);return s$(s),new s0(e,null,s)}{if(!(e instanceof sJ||e instanceof s0))throw new T(E.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let s=e._path.child(O.fromString(t,...n));return s$(s),new s0(e.firestore,null,s)}}function s2(e,t,...n){if(e=(0,l.m9)(e),1==arguments.length&&(t=R.R()),sz("doc","path",t),e instanceof sX){let s=O.fromString(t,...n);return sG(s),new sJ(e,null,new q(s))}{if(!(e instanceof sJ||e instanceof s0))throw new T(E.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let s=e._path.child(O.fromString(t,...n));return sG(s),new sJ(e.firestore,e instanceof s0?e.converter:null,new q(s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s4{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Rc(this.observer.next,e)}error(e){this.observer.error?this.Rc(this.observer.error,e):p("Uncaught Error in snapshot listener:",e.toString())}bc(){this.muted=!0}Rc(e,t){this.muted||setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s3{constructor(e,t,n,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=s,this.user=c.UNAUTHENTICATED,this.clientId=R.R(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(n,async e=>{g("FirestoreClient","Received user=",e.uid),await this.authCredentialListener(e),this.user=e}),this.appCheckCredentials.start(n,e=>(g("FirestoreClient","Received new app check token=",e),this.appCheckCredentialListener(e,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new T(E.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();let e=new I;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){let t=sa(n,"Failed to shutdown persistence");e.reject(t)}}),e.promise}}async function s9(e,t){e.asyncQueue.verifyOperationInProgress(),g("FirestoreClient","Initializing OfflineComponentProvider");let n=await e.getConfiguration();await t.initialize(n);let s=n.initialUser;e.setCredentialChangeListener(async e=>{s.isEqual(e)||(await nS(t.localStore,e),s=e)}),t.persistence.setDatabaseDeletedListener(()=>e.terminate()),e.offlineComponents=t}async function s5(e,t){e.asyncQueue.verifyOperationInProgress();let n=await s6(e);g("FirestoreClient","Initializing OnlineComponentProvider");let s=await e.getConfiguration();await t.initialize(n,s),e.setCredentialChangeListener(e=>st(t.remoteStore,e)),e.setAppCheckTokenChangeListener((e,n)=>st(t.remoteStore,n)),e.onlineComponents=t}async function s6(e){return e.offlineComponents||(g("FirestoreClient","Using default OfflineComponentProvider"),await s9(e,new sK)),e.offlineComponents}async function s8(e){return e.onlineComponents||(g("FirestoreClient","Using default OnlineComponentProvider"),await s5(e,new sQ)),e.onlineComponents}async function s7(e){let t=await s8(e),n=t.eventManager;return n.onListen=sS.bind(null,t.syncEngine),n.onUnlisten=sA.bind(null,t.syncEngine),n}class re{constructor(){this.Bc=Promise.resolve(),this.Lc=[],this.qc=!1,this.Uc=[],this.Kc=null,this.Gc=!1,this.Qc=!1,this.jc=[],this.xo=new nO(this,"async_queue_retry"),this.Wc=()=>{let e=nF();e&&g("AsyncQueue","Visibility state changed to "+e.visibilityState),this.xo.Po()};let e=nF();e&&"function"==typeof e.addEventListener&&e.addEventListener("visibilitychange",this.Wc)}get isShuttingDown(){return this.qc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.zc(),this.Hc(e)}enterRestrictedMode(e){if(!this.qc){this.qc=!0,this.Qc=e||!1;let t=nF();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.Wc)}}enqueue(e){if(this.zc(),this.qc)return new Promise(()=>{});let t=new I;return this.Hc(()=>this.qc&&this.Qc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Lc.push(e),this.Jc()))}async Jc(){if(0!==this.Lc.length){try{await this.Lc[0](),this.Lc.shift(),this.xo.reset()}catch(e){if(!G(e))throw e;g("AsyncQueue","Operation failed with retryable error: "+e)}this.Lc.length>0&&this.xo.Ro(()=>this.Jc())}}Hc(e){let t=this.Bc.then(()=>(this.Gc=!0,e().catch(e=>{let t;this.Kc=e,this.Gc=!1;let n=(t=e.message||"",e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t);throw p("INTERNAL UNHANDLED ERROR: ",n),e}).then(e=>(this.Gc=!1,e))));return this.Bc=t,t}enqueueAfterDelay(e,t,n){this.zc(),this.jc.indexOf(e)>-1&&(t=0);let s=si.createAndSchedule(this,e,t,n,e=>this.Yc(e));return this.Uc.push(s),s}zc(){this.Kc&&v()}verifyOperationInProgress(){}async Xc(){let e;do await (e=this.Bc);while(e!==this.Bc)}Zc(e){for(let t of this.Uc)if(t.timerId===e)return!0;return!1}ta(e){return this.Xc().then(()=>{for(let t of(this.Uc.sort((e,t)=>e.targetTimeMs-t.targetTimeMs),this.Uc))if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.Xc()})}ea(e){this.jc.push(e)}Yc(e){let t=this.Uc.indexOf(e);this.Uc.splice(t,1)}}function rt(e){return function(e,t){if("object"!=typeof e||null===e)return!1;for(let n of t)if(n in e&&"function"==typeof e[n])return!0;return!1}(e,["next","error","complete"])}class rn extends sX{constructor(e,t,n,s){super(e,t,n,s),this.type="firestore",this._queue=new re,this._persistenceKey=(null==s?void 0:s.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||ri(this),this._firestoreClient.terminate()}}function rs(e,t){let n="object"==typeof e?e:(0,i.Mq)(),s=(0,i.qX)(n,"firestore").getImmediate({identifier:"string"==typeof e?e:t||"(default)"});if(!s._initialized){let e=(0,l.P0)("firestore");e&&function(e,t,n,s={}){var r;let i=(e=sW(e,sX))._getSettings();if("firestore.googleapis.com"!==i.host&&i.host!==t&&y("Host has been set in both settings() and useEmulator(), emulator host will be used"),e._setSettings(Object.assign(Object.assign({},i),{host:`${t}:${n}`,ssl:!1})),s.mockUserToken){let t,n;if("string"==typeof s.mockUserToken)t=s.mockUserToken,n=c.MOCK_USER;else{t=(0,l.Sg)(s.mockUserToken,null===(r=e._app)||void 0===r?void 0:r.options.projectId);let i=s.mockUserToken.sub||s.mockUserToken.user_id;if(!i)throw new T(E.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");n=new c(i)}e._authCredentials=new k(new C(t,n))}}(s,...e)}return s}function rr(e){return e._firestoreClient||ri(e),e._firestoreClient.verifyNotTerminated(),e._firestoreClient}function ri(e){var t,n,s,r;let i=e._freezeSettings(),a=(n=e._databaseId,s=(null===(t=e._app)||void 0===t?void 0:t.options.appId)||"",r=e._persistenceKey,new j(n,s,r,i.host,i.ssl,i.experimentalForceLongPolling,i.experimentalAutoDetectLongPolling,i.useFetchStreams));e._firestoreClient=new s3(e._authCredentials,e._appCheckCredentials,e._queue,a)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ra{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ra(Z.fromBase64String(e))}catch(e){throw new T(E.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new ra(Z.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ro{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new T(E.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new P(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rl{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ru{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new T(E.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new T(E.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return L(this._lat,e._lat)||L(this._long,e._long)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rh=/^__.*__$/;class rc{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new tp(e,this.data,this.fieldMask,t,this.fieldTransforms):new tg(e,this.data,t,this.fieldTransforms)}}class rd{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new tp(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function rf(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw v()}}class rm{constructor(e,t,n,s,r,i){this.settings=e,this.databaseId=t,this.yt=n,this.ignoreUndefinedProperties=s,void 0===r&&this.na(),this.fieldTransforms=r||[],this.fieldMask=i||[]}get path(){return this.settings.path}get sa(){return this.settings.sa}ia(e){return new rm(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.yt,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}ra(e){var t;let n=null===(t=this.path)||void 0===t?void 0:t.child(e),s=this.ia({path:n,oa:!1});return s.ua(e),s}ca(e){var t;let n=null===(t=this.path)||void 0===t?void 0:t.child(e),s=this.ia({path:n,oa:!1});return s.na(),s}aa(e){return this.ia({path:void 0,oa:!0})}ha(e){return rk(e,this.settings.methodName,this.settings.la||!1,this.path,this.settings.fa)}contains(e){return void 0!==this.fieldMask.find(t=>e.isPrefixOf(t))||void 0!==this.fieldTransforms.find(t=>e.isPrefixOf(t.field))}na(){if(this.path)for(let e=0;e<this.path.length;e++)this.ua(this.path.get(e))}ua(e){if(0===e.length)throw this.ha("Document fields must not be empty");if(rf(this.sa)&&rh.test(e))throw this.ha('Document fields cannot begin and end with "__"')}}class rg{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.yt=n||nM(e)}da(e,t,n,s=!1){return new rm({sa:e,methodName:t,fa:n,path:P.emptyPath(),oa:!1,la:s},this.databaseId,this.yt,this.ignoreUndefinedProperties)}}function rp(e){let t=e._freezeSettings(),n=nM(e._databaseId);return new rg(e._databaseId,!!t.ignoreUndefinedProperties,n)}class ry extends rl{_toFieldTransform(e){if(2!==e.sa)throw 1===e.sa?e.ha(`${this._methodName}() can only appear at the top level of your update data`):e.ha(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof ry}}function rw(e,t){if(rE(e=(0,l.m9)(e)))return rT("Unsupported field value:",t,e),rv(e,t);if(e instanceof rl)return function(e,t){if(!rf(t.sa))throw t.ha(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.ha(`${e._methodName}() is not currently supported inside arrays`);let n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.oa&&4!==t.sa)throw t.ha("Nested arrays are not supported");return function(e,t){let n=[],s=0;for(let r of e){let e=rw(r,t.aa(s));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),s++}return{arrayValue:{values:n}}}(e,t)}return function(e,t){if(null===(e=(0,l.m9)(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e){var n,s,r;return n=t.yt,"number"==typeof(r=s=e)&&Number.isInteger(r)&&!J(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER?e6(s):e5(n,s)}if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){let n=V.fromDate(e);return{timestampValue:tj(t.yt,n)}}if(e instanceof V){let n=new V(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:tj(t.yt,n)}}if(e instanceof ru)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof ra)return{bytesValue:tW(t.yt,e._byteString)};if(e instanceof sJ){let n=t.databaseId,s=e.firestore._databaseId;if(!s.isEqual(n))throw t.ha(`Document reference is for database ${s.projectId}/${s.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:tY(e.firestore._databaseId||t.databaseId,e._key.path)}}throw t.ha(`Unsupported field value: ${sj(e)}`)}(e,t)}function rv(e,t){let n={};return X(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Y(e,(e,s)=>{let r=rw(s,t.ra(e));null!=r&&(n[e]=r)}),{mapValue:{fields:n}}}function rE(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof V||e instanceof ru||e instanceof ra||e instanceof sJ||e instanceof rl)}function rT(e,t,n){if(!rE(n)||!("object"==typeof n&&null!==n&&(Object.getPrototypeOf(n)===Object.prototype||null===Object.getPrototypeOf(n)))){let s=sj(n);throw"an object"===s?t.ha(e+" a custom object"):t.ha(e+" "+s)}}function rI(e,t,n){if((t=(0,l.m9)(t))instanceof ro)return t._internalPath;if("string"==typeof t)return rS(e,t);throw rk("Field path arguments must be of type string or ",e,!1,void 0,n)}let rC=RegExp("[~\\*/\\[\\]]");function rS(e,t,n){if(t.search(rC)>=0)throw rk(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new ro(...t.split("."))._internalPath}catch(s){throw rk(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function rk(e,t,n,s,r){let i=s&&!s.isEmpty(),a=void 0!==r,o=`Function ${t}() called with invalid data`;n&&(o+=" (via `toFirestore()`)"),o+=". ";let l="";return(i||a)&&(l+=" (found",i&&(l+=` in field ${s}`),a&&(l+=` in document ${r}`),l+=")"),new T(E.INVALID_ARGUMENT,o+e+l)}function rA(e,t){return e.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class r_{constructor(e,t,n,s,r){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=s,this._converter=r}get id(){return this._key.path.lastSegment()}get ref(){return new sJ(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){let e=new rN(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(rb("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class rN extends r_{data(){return super.data()}}function rb(e,t){return"string"==typeof t?rS(e,t):t instanceof ro?t._internalPath:t._delegate._internalPath}class rD{convertValue(e,t="none"){switch(eo(e)){case 0:return null;case 1:return e.booleanValue;case 2:return en(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(es(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw v()}}convertObject(e,t){let n={};return Y(e.fields,(e,s)=>{n[e]=this.convertValue(s,t)}),n}convertGeoPoint(e){return new ru(en(e.latitude),en(e.longitude))}convertArray(e,t){return(e.values||[]).map(e=>this.convertValue(e,t))}convertServerTimestamp(e,t){switch(t){case"previous":let n=function e(t){let n=t.mapValue.fields.__previous_value__;return er(n)?e(n):n}(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(ei(e));default:return null}}convertTimestamp(e){let t=et(e);return new V(t.seconds,t.nanos)}convertDocumentKey(e,t){let n=O.fromString(e);t5(n)||v();let s=new W(n.get(1),n.get(3)),r=new q(n.popFirst(5));return s.isEqual(t)||p(`Document ${r} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rR{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class rL extends r_{constructor(e,t,n,s,r,i){super(e,t,n,s,i),this._firestore=e,this._firestoreImpl=e,this.metadata=r}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new rx(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let n=this._document.data.field(rb("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}}class rx extends rL{data(e={}){return super.data(e)}}class rV{constructor(e,t,n,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new rR(s.hasPendingWrites,s.fromCache),this.query=n}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return 0===this.size}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new rx(this._firestore,this._userDataWriter,n.key,n,new rR(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new T(E.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(e,t){if(e._snapshot.oldDocs.isEmpty()){let t=0;return e._snapshot.docChanges.map(n=>{let s=new rx(e._firestore,e._userDataWriter,n.doc.key,n.doc,new rR(e._snapshot.mutatedKeys.has(n.doc.key),e._snapshot.fromCache),e.query.converter);return n.doc,{type:"added",doc:s,oldIndex:-1,newIndex:t++}})}{let n=e._snapshot.oldDocs;return e._snapshot.docChanges.filter(e=>t||3!==e.type).map(t=>{let s=new rx(e._firestore,e._userDataWriter,t.doc.key,t.doc,new rR(e._snapshot.mutatedKeys.has(t.doc.key),e._snapshot.fromCache),e.query.converter),r=-1,i=-1;return 0!==t.type&&(r=n.indexOf(t.doc.key),n=n.delete(t.doc.key)),1!==t.type&&(i=(n=n.add(t.doc)).indexOf(t.doc.key)),{type:function(e){switch(e){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return v()}}(t.type),doc:s,oldIndex:r,newIndex:i}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}class rF extends rD{constructor(e){super(),this.firestore=e}convertBytes(e){return new ra(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new sJ(this.firestore,null,t)}}function rM(e,t,n,...s){let r;e=sW(e,sJ);let i=sW(e.firestore,rn),a=rp(i);return r="string"==typeof(t=(0,l.m9)(t))||t instanceof ro?function(e,t,n,s,r,i){let a=e.da(1,t,n),o=[rI(t,s,n)],u=[r];if(i.length%2!=0)throw new T(E.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let e=0;e<i.length;e+=2)o.push(rI(t,i[e])),u.push(i[e+1]);let h=[],c=eQ.empty();for(let e=o.length-1;e>=0;--e)if(!rA(h,o[e])){let t=o[e],n=u[e];n=(0,l.m9)(n);let s=a.ca(t);if(n instanceof ry)h.push(t);else{let e=rw(n,s);null!=e&&(h.push(t),c.set(t,e))}}let d=new eK(h);return new rd(c,d,a.fieldTransforms)}(a,"updateDoc",e._key,t,n,s):function(e,t,n,s){let r=e.da(1,t,n);rT("Data must be an object, but it was:",r,s);let i=[],a=eQ.empty();Y(s,(e,s)=>{let o=rS(t,e,n);s=(0,l.m9)(s);let u=r.ca(o);if(s instanceof ry)i.push(o);else{let e=rw(s,u);null!=e&&(i.push(o),a.set(o,e))}});let o=new eK(i);return new rd(a,o,r.fieldTransforms)}(a,"updateDoc",e._key,t),rq(i,[r.toMutation(e._key,tu.exists(!0))])}function rO(e){return rq(sW(e.firestore,rn),[new tE(e._key,tu.none())])}function rU(e,t){var n,s;let r=sW(e.firestore,rn),i=s2(e),a=(n=e.converter)?s&&(s.merge||s.mergeFields)?n.toFirestore(t,s):n.toFirestore(t):t;return rq(r,[(function(e,t,n,s,r,i={}){let a,o;let l=e.da(i.merge||i.mergeFields?2:0,t,n,r);rT("Data must be an object, but it was:",l,s);let u=rv(s,l);if(i.merge)a=new eK(l.fieldMask),o=l.fieldTransforms;else if(i.mergeFields){let e=[];for(let s of i.mergeFields){let r=rI(t,s,n);if(!l.contains(r))throw new T(E.INVALID_ARGUMENT,`Field '${r}' is specified in your field mask but missing from your input data.`);rA(e,r)||e.push(r)}a=new eK(e),o=l.fieldTransforms.filter(e=>a.covers(e.field))}else a=null,o=l.fieldTransforms;return new rc(new eQ(u),a,o)})(rp(e.firestore),"addDoc",i._key,a,null!==e.converter,{}).toMutation(i._key,tu.exists(!1))]).then(()=>i)}function rP(e,...t){var n,s,r,i;let a,o,u;e=(0,l.m9)(e);let h={includeMetadataChanges:!1},c=0;"object"!=typeof t[0]||rt(t[c])||(h=t[c],c++);let d={includeMetadataChanges:h.includeMetadataChanges};if(rt(t[c])){let e=t[c];t[c]=null===(n=e.next)||void 0===n?void 0:n.bind(e),t[c+1]=null===(s=e.error)||void 0===s?void 0:s.bind(e),t[c+2]=null===(r=e.complete)||void 0===r?void 0:r.bind(e)}if(e instanceof sJ)o=sW(e.firestore,rn),i=e._key.path,u=new eY(i),a={next:n=>{t[c]&&t[c](function(e,t,n){let s=n.docs.get(t._key),r=new rF(e);return new rL(e,r,t._key,s,new rR(n.hasPendingWrites,n.fromCache),t.converter)}(o,e,n))},error:t[c+1],complete:t[c+2]};else{let n=sW(e,sZ);o=sW(n.firestore,rn),u=n._query;let s=new rF(o);a={next:e=>{t[c]&&t[c](new rV(o,s,n,e))},error:t[c+1],complete:t[c+2]},/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function(e){if("L"===e.limitType&&0===e.explicitOrderBy.length)throw new T(E.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}(e._query)}return function(e,t,n,s){let r=new s4(s),i=new sy(t,r,n);return e.asyncQueue.enqueueAndForget(async()=>sd(await s7(e),i)),()=>{r.bc(),e.asyncQueue.enqueueAndForget(async()=>sf(await s7(e),i))}}(rr(o),u,d,a)}function rq(e,t){return function(e,t){let n=new I;return e.asyncQueue.enqueueAndForget(async()=>s_(await s8(e).then(e=>e.syncEngine),t,n)),n.promise}(rr(e),t)}!function(e,t=!0){d=i.Jn,(0,i.Xd)(new a.wA("firestore",(e,{instanceIdentifier:n,options:s})=>{let r=e.getProvider("app").getImmediate(),i=new rn(new A(e.getProvider("auth-internal")),new D(e.getProvider("app-check-internal")),function(e,t){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new T(E.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new W(e.options.projectId,t)}(r,n),r);return s=Object.assign({useFetchStreams:t},s),i._setSettings(s),i},"PUBLIC").setMultipleInstances(!0)),(0,i.KN)(h,"3.8.1",void 0),(0,i.KN)(h,"3.8.1","esm2017")}()}}]);