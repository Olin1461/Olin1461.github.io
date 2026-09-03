window.EXAMDB = window.EXAMDB || {};
(function(){
const R = String.raw;
const C = window.EXAMDB.ece637 = window.EXAMDB.ece637 || {id:"ece637", code:"ECE 63700 (ECE 637)", title:"Digital Image Processing I", exams:{}};
C.exams.final = {
 id:"final", name:"Final", years:"Spring 2016 – Spring 2026 (11 finals)",
 format:"4–5 problems, 120 min, closed book with fact sheet, cumulative",
 mockCount:5, mockTime:"120 minutes",
 notes: R`<b>What the last eleven finals look like.</b> The final is cumulative but leans on the second half. Sampling and reconstruction (sampled sincs, upsampling by zero-insertion plus interpolation filter, detector/display chains) is in 7 of 11 finals and every one since 2023. Transmission CT / tomography (Beer–Lambert, path length through a material, dual-energy beam hardening, Fourier slice, deconvolution) is in 6 of 11. Least-squares vs. MMSE estimation and white-noise-driven AR processes (analysis / synthesis diagrams) appear in 8 of 11. Since 2024 a "definitions" problem on linearity and time invariance (prove or disprove, median filter, general form of a linear/LTI system) opens the exam. Halftoning, bilateral filters and CNN parameter counting were common in 2016–2022 but have not appeared since.`,
 categories:[
 {
  id:"samp", name:"Sampling and reconstruction: sampled sincs, upsampling / multirate, detector and display chains", prob:90, trend:"rising",
  years:["2017 P1–P2","2019 P3","2021 P4","2023 P5","2024 P3","2025 P3","2026 P1"],
  evidence: R`Seven of eleven finals, and the opening problem in 2026. Asks: CTFT of $\mathrm{sinc}(t)$, DTFT of $s(n)=\mathrm{sinc}(nT)$ for $T=0.1,0.5,1$ (sketch $x(n)$ and $|X(e^{j\omega})|$ with units), the Nyquist period, reconstruction of $s(t)$ from $x(n)$, upsampling by $L$ (zero insertion then a low-pass with gain $L$ and cutoff $\pi/L$), multirate systems with down/up-samplers (LTI or not), and the focal-plane-array plus LCD chain with compensation filter.`,
  concepts:[
   R`$x(n)=s(nT)\Rightarrow X(e^{j\omega})=\tfrac1T\sum_kS\big(\tfrac{\omega-2\pi k}{2\pi T}\big)$; $\omega=2\pi fT$; sampling frequency $f_s=1/T$ Hz; Nyquist: $T&lt;\tfrac1{2f_c}$, $f_s>2f_c$.`,
   R`$s(t)=\mathrm{sinc}(t)\leftrightarrow\mathrm{rect}(f)$, $f_c=\tfrac12$, Nyquist $T=1$ s. $T=0.1$: $x(n)=\mathrm{sinc}(0.1n)$, $X=10\,\mathrm{rect}(\omega/0.2\pi)$ periodic (narrow tall boxes). $T=0.5$: $X=2\,\mathrm{rect}(\omega/\pi)$. $T=1$: $x(n)=\delta(n)$, $X=1$ (boxes exactly tile).`,
   R`Reconstruction under Nyquist: $S(f)=T\,X(e^{j2\pi fT})\mathrm{rect}(fT)$ and $s(t)=\sum_nx(n)\mathrm{sinc}\big(\tfrac{t-nT}{T}\big)$.`,
   R`Upsampling by $L$: $z(n)=x(n/L)$ for $n\bmod L=0$, else 0, so $Z(e^{j\omega})=X(e^{j\omega L})$ (spectrum compressed, $L-1$ images). Then $y=h*z$ with $H(e^{j\omega})=L$ for $|\omega|&lt;\pi/L$ (0 otherwise), $h(n)=\mathrm{sinc}(n/L)$, gives $y(n)=s(nT/L)$. Downsampling by $L$ needs an anti-alias low-pass with cutoff $\pi/L$ first; the down/up chain is linear but not time invariant.`,
   R`Detector integration = convolution with $\tfrac1{T^2}\mathrm{rect}(x/T,y/T)$ (CSFT $\mathrm{sinc}(Tu,Tv)$) then sampling; display with $\mathrm{rect}(x/T,y/T)$ pixels multiplies by $T^2\mathrm{sinc}(Tu,Tv)$; net $F=\mathrm{sinc}^2(Tu,Tv)G$ under Nyquist; compensate with $H=1/\mathrm{sinc}^2(\mu/2\pi,\nu/2\pi)$ (gain 2.47 at the band edge).`,
   R`Always attach units: $T$ in seconds, $f_s$ in Hz, $\omega$ in rad/sample.`
  ],
  problems:[
   { title:"Sampling and upsampling a sinc", points:40,
     intro: R`Let $s(t)=\mathrm{sinc}(2t)$ (time in seconds) and $x(n)=s(nT)$.`,
     parts:[
      {q:R`Sketch $s(t)$ and compute and sketch $S(f)$. What are the band limit and the Nyquist sampling period and frequency?`,
       a:R`$s$ is a sinc with zero crossings every $0.5$ s. $S(f)=\tfrac12\mathrm{rect}(f/2)$: height $\tfrac12$ on $|f|&lt;1$ Hz. Band limit $f_c=1$ Hz, Nyquist frequency $2$ Hz, Nyquist period $T_{nyq}=0.5$ s.`},
      {q:R`Write $X(e^{j\omega})$ in terms of $S$. Sketch $x(n)$ and $|X(e^{j\omega})|$ for $T=0.25$ s.`,
       a:R`$X(e^{j\omega})=\tfrac1T\sum_kS\big(\tfrac{\omega-2\pi k}{2\pi T}\big)$. For $T=0.25$: $X=4\cdot\tfrac12\sum_k\mathrm{rect}\big(\tfrac{\omega-2\pi k}{4\pi\cdot0.25}\big)=2\sum_k\mathrm{rect}\big(\tfrac{\omega-2\pi k}{\pi}\big)$: boxes of height 2 and width $\pi$, centered at multiples of $2\pi$, with gaps. $x(n)=\mathrm{sinc}(n/2)$: $1,\tfrac2\pi,0,-\tfrac2{3\pi},0,\dots$`},
      {q:R`Repeat for $T=0.5$ s and $T=1$ s. Comment on aliasing.`,
       a:R`$T=0.5$: $X=2\cdot\tfrac12\sum_k\mathrm{rect}\big(\tfrac{\omega-2\pi k}{2\pi}\big)=1$ for all $\omega$ (boxes exactly tile) and $x(n)=\mathrm{sinc}(n)=\delta(n)$: critically sampled, still recoverable. $T=1$: $X=\tfrac12\sum_k\mathrm{rect}\big(\tfrac{\omega-2\pi k}{4\pi}\big)$, boxes of width $4\pi$ every $2\pi$ overlap twice, summing to 1; $x(n)=\mathrm{sinc}(2n)=\delta(n)$ again, but now the samples are indistinguishable from those of $\mathrm{sinc}(t)$: aliasing.`},
      {q:R`Assuming $T&lt;T_{nyq}$, give $S(f)$ in terms of $X$, and $s(t)$ in terms of $x(n)$.`,
       a:R`$S(f)=T\,X(e^{j2\pi fT})\,\mathrm{rect}(fT)$ (select the $k=0$ replica) and $s(t)=\sum_nx(n)\,\mathrm{sinc}\big(\tfrac{t-nT}{T}\big)$.`},
      {q:R`Starting from $x(n)=s(n/4)$, design a discrete-time system that produces $y(n)=s(n/8)$: give each step, the filter's frequency response and impulse response.`,
       a:R`Upsample by $L=2$: $z(n)=x(n/2)$ for even $n$, 0 for odd $n$, so $Z(e^{j\omega})=X(e^{j2\omega})$ (the box of width $\pi$ at height 2 becomes boxes of width $\pi/2$ centered at $0$ and $\pi$). Remove the image at $\pi$ and restore the gain with $H(e^{j\omega})=2$ for $|\omega|&lt;\pi/2$, $0$ for $\pi/2&lt;|\omega|&lt;\pi$; $h(n)=\tfrac2{2\pi}\int_{-\pi/2}^{\pi/2}e^{j\omega n}d\omega=\mathrm{sinc}(n/2)$. Then $Y=HZ=4\,\mathrm{rect}(\omega/(\pi/2))$ periodic, which is the DTFT of $s(n/8)$ (height $\tfrac1T\cdot\tfrac12=4$ with $T=\tfrac18$). Generally: gain $L$, cutoff $\pi/L$, $h(n)=\mathrm{sinc}(n/L)$.`},
      {q:R`Is the cascade "downsample by 2 then upsample by 2 with the filter of part e)" linear? Time invariant? Justify.`,
       a:R`Linear: both sample-rate changes and the filter are linear operations. Not time invariant: shifting the input by one sample changes which samples are discarded by the downsampler, so the output is not simply a shifted version (e.g. $\delta(n)$ passes through, but $\delta(n-1)$ is killed).`}
     ]},
   { title:"Display with sub-pixel gaps and a Gaussian printer dot", points:30,
     intro: R`A camera with ideal (point) sampling gives $s(m,n)=g(mT,nT)$ of a band-limited $g$ ($G=0$ for $|u|,|v|\ge\tfrac1{2T}$). Two displays are considered: (D1) an LCD whose lit pixel is a square of side $aT$ ($0&lt;a\le1$, fill factor $a^2$) centered on each sample; (D2) a printer that places a Gaussian dot $p_2(x,y)=\exp\{-(x^2+y^2)/2\tau^2\}$ at each sample. Each display forms $f(x,y)=\sum_{m,n}s(m,n)p(x-mT,y-nT)$.`,
     parts:[
      {q:R`Write $F(u,v)$ in terms of $P(u,v)$ and $S(e^{j\mu},e^{j\nu})$, then in terms of $G$.`,
       a:R`$F(u,v)=P(u,v)\,S(e^{j2\pi Tu},e^{j2\pi Tv})$ and $S=\tfrac1{T^2}\sum_{k,l}G\big(u-\tfrac kT,v-\tfrac lT\big)$ after the substitution, so $F(u,v)=\tfrac1{T^2}P(u,v)\sum_{k,l}G(u-k/T,v-l/T)$: the display psf's transform multiplies the periodically replicated spectrum.`},
      {q:R`For D1 give $P_1(u,v)$, the resulting $F$ inside the base band, and the attenuation at the band edge for $a=1$ and $a=0.5$.`,
       a:R`$P_1=a^2T^2\mathrm{sinc}(aTu,aTv)$, so in the base band $F=a^2\,\mathrm{sinc}(aTu,aTv)\,G(u,v)$. At $u=\tfrac1{2T}$, $v=0$: $\mathrm{sinc}(a/2)$ equals $0.64$ for $a=1$ and $0.90$ for $a=0.5$. Smaller pixels blur less (but the $a^2$ brightness factor drops and, see part d), the replicas leak more).`},
      {q:R`For D2 give $P_2(u,v)$ and choose $\tau$ so that the base-band attenuation at the band edge is $0.5$.`,
       a:R`$P_2(u,v)=2\pi\tau^2\exp\{-2\pi^2\tau^2(u^2+v^2)\}$ (Gaussian pair). Setting $\exp\{-2\pi^2\tau^2/(4T^2)\}=0.5$: $\tau^2=\dfrac{2T^2\ln2}{\pi^2}$, $\tau\approx0.375\,T$.`},
      {q:R`The replicas at $(u,v)=(\pm1/T,0)$ are the visible pixel structure. Compare how strongly D1 (with $a=0.5$) and D2 (with the $\tau$ of part c) suppress the first replica, evaluating $P$ at $u=1/T$ relative to $P(0,0)$.`,
       a:R`D1: $\mathrm{sinc}(a)=\mathrm{sinc}(0.5)=0.64$, so the replica is passed at 64%: a strongly visible pixel grid (this is why small fill factors look "screen-door"). D2: $\exp\{-2\pi^2\tau^2/T^2\}=\exp\{-4\ln2\}=0.0625$: the Gaussian dot suppresses the grid to 6%. Reconstruction psfs trade base-band sharpness against replica suppression.`},
      {q:R`Specify a digital pre-filter $H(e^{j\mu},e^{j\nu})$ applied to $s$ that makes D2 reproduce $G$ exactly in the base band, and state its maximum gain.`,
       a:R`$H(e^{j\mu},e^{j\nu})=\dfrac{T^2}{P_2\big(\tfrac{\mu}{2\pi T},\tfrac{\nu}{2\pi T}\big)}=\dfrac{T^2}{2\pi\tau^2}\exp\Big\{\dfrac{\tau^2(\mu^2+\nu^2)}{2T^2}\Big\}$ on $[-\pi,\pi]^2$. At the corner $(\pi,\pi)$ the relative gain is $1/0.5^2=4$ (0.5 attenuation per axis), so noise is amplified fourfold there.`}
     ]}
  ]
 },
 {
  id:"ct", name:"X-ray CT and tomography: Beer–Lambert, path lengths, beam hardening, Fourier slice, deconvolution", prob:78, trend:"stable",
  years:["2017 P4","2018 P1","2022 P3–P4","2023 P4","2024 P4","2025 P4"],
  evidence: R`Six of eleven finals. Recent versions go beyond Exam 1: derive the path length through a known material from $y_T$ and the blank scan ($L=-\tfrac1{\mu_0}\log(y_T/y_{T,0})$), sketch $y_T$ versus $L$ at two energies, show that a two-energy source makes $p=-\log(y_T/y_0)$ a concave (nonlinear) function of $L$ (beam hardening), explain preprocessing before reconstruction, prove the Fourier slice theorem and band-limit property, and (2023) show the back-projection blur $1/\sqrt{x^2+y^2}$ has CSFT $1/\rho$.`,
  concepts:[
   R`$\dfrac{dy}{dx}=-\mu(x)y\Rightarrow y(x)=y_0\exp\{-\int_0^x\mu\}$; blank scan $y_{T,0}=y_0$; $\int_0^T\mu=-\log(y_T/y_{T,0})$. Photon energy $E=h\nu=hc/\lambda$.`,
   R`Single known material with indicator $I(x)$: $\mu=\mu_0I(x)$, path length $L=\int I=-\tfrac1{\mu_0}\log(y_T/y_{T,0})$; $y_T=y_0e^{-\mu_0L}$ falls to $e^{-1}y_0$ at $L=1/\mu_0$ (4.76 cm at 0.21 cm$^{-1}$, 5.88 cm at 0.17 cm$^{-1}$).`,
   R`Polychromatic source with energy fractions $w_e$: $y_T=y_0\sum_ew_ee^{-\mu_eL}$ and $p(L)=-\log\sum_ew_ee^{-\mu_eL}$ is concave, starting with slope $\bar\mu=\sum w_e\mu_e$ and bending toward the smallest $\mu_e$: beam hardening (cupping/streaks) unless corrected.`,
   R`Preprocessing: blank scan, object scan, transmission $=y/y_0\in(0,1]$, sinogram $p=-\log(\text{transmission})$ (divided by $\mu_0$ for path length), then filtered back-projection.`,
   R`Fourier slice theorem $P_\theta(\rho)=F(\rho\cos\theta,\rho\sin\theta)$; projections inherit the band limit. Back-projection without filtering yields $f*\tfrac1r$ whose CSFT is $1/\rho$; FBP applies the ramp $|\rho|$. Deconvolving $1/r$ is benign ($1/\rho$ has no zeros); deconvolving $\mathrm{sinc}$ is not (spectral nulls).`,
   R`$\delta(t)=\int e^{j2\pi rt}dr$ and polar coordinates $dx\,dy=r\,dr\,d\theta$ are the tools for the $1/r$ transform.`
  ],
  problems:[
   { title:"Dual-energy transmission and beam hardening", points:35,
     intro: R`A mono-energetic beam obeys $dy/dx=-\mu(x)y(x)$. An aluminum part has $\mu(x)=\mu_EI(x)$ with $\mu_E=0.57$ cm$^{-1}$ at 50 keV and $0.30$ cm$^{-1}$ at 100 keV, and $L=\int_0^TI(x)dx$ is the path length through aluminum.`,
     parts:[
      {q:R`Solve the ODE with $y(0)=y_0$ and show the blank scan gives $y_{T,0}=y_0$.`,
       a:R`$y(x)=y_0\exp\{-\int_0^x\mu(t)dt\}$. With the object removed $\mu\equiv0$ so $y(T)=y_0e^0=y_0$.`},
      {q:R`Express $y_T$ in terms of $\mu_E$ and $L$, and solve for $L$ from the two scans.`,
       a:R`$y_T=y_0\exp\{-\mu_E\int_0^TI\}=y_0e^{-\mu_EL}$, so $L=-\dfrac1{\mu_E}\log\dfrac{y_T}{y_{T,0}}$.`},
      {q:R`Sketch $y_T/y_0$ versus $L$ at 50 keV and at 100 keV; mark where each falls to $e^{-1}$.`,
       a:R`Two decaying exponentials starting at 1. At 50 keV, $e^{-1}\approx0.37$ is reached at $L=1/0.57\approx1.75$ cm; at 100 keV at $L=1/0.30\approx3.33$ cm. The high-energy beam penetrates further.`},
      {q:R`Now the source emits both energies in equal proportion ($y_0=1$ for each). Write $y_T(L)$ and $p(L)=-\log(y_T/y_{T,0})$ and show $p$ is not linear in $L$.`,
       a:R`$y_T=e^{-0.57L}+e^{-0.30L}$, $y_{T,0}=2$, $p(L)=-\log\tfrac12\big(e^{-0.57L}+e^{-0.30L}\big)$. $p(0)=0$, $p'(0)=\tfrac{0.57+0.30}2=0.435$ cm$^{-1}$, but for large $L$ the soft term dies and $p\approx0.30L+\log2$, slope 0.30. $p$ is concave in $L$: this is beam hardening.`},
      {q:R`Why does beam hardening produce artifacts in a reconstruction that assumes $p=\mu_{\rm eff}L$, and name a remedy.`,
       a:R`Long paths (through the object's center) are under-measured relative to short paths, so the center of a uniform object reconstructs darker (cupping) and dense objects cast streaks. Remedies: pre-filter the beam to harden it, apply a polynomial linearization of $p$ calibrated on known thicknesses, or use dual-energy / model-based reconstruction.`},
      {q:R`List the preprocessing steps needed to turn raw detector counts into a sinogram of path lengths.`,
       a:R`(1) Acquire the blank scan $y_{T,0}$ (no object) and the object scan $y_T$ at every angle and detector; (2) form the transmission $y_T/y_{T,0}$; (3) take $-\log$ and divide by $\mu_E$ (mono-energetic) or apply the beam-hardening linearization; (4) arrange by angle and detector to form the sinogram; then reconstruct (e.g. FBP) to obtain an image that is $\approx1$ in aluminum and $0$ in air.`}
     ]},
   { title:"Fourier slice theorem, back-projection blur and filtered back-projection", points:30,
     intro: R`Let $f(x,y)$ have CSFT $F(u,v)$ and projections $p_\theta(r)$ with CTFT $P_\theta(\rho)$.`,
     parts:[
      {q:R`Prove the Fourier slice theorem.`,
       a:R`$P_\theta(\rho)=\int\!\!\int f(r\cos\theta-z\sin\theta,r\sin\theta+z\cos\theta)e^{-j2\pi\rho r}dz\,dr$. Change variables to $(x,y)$ (unit Jacobian, rotation) with $r=x\cos\theta+y\sin\theta$: $=\int\!\!\int f(x,y)e^{-j2\pi\rho(x\cos\theta+y\sin\theta)}dxdy=F(\rho\cos\theta,\rho\sin\theta)$.`},
      {q:R`Show that if $F$ vanishes outside the disk of radius $f_c$ then every $p_\theta$ is band-limited to $f_c$, and state the sampling requirement on the detector spacing.`,
       a:R`$|(\rho\cos\theta,\rho\sin\theta)|=|\rho|$, so $P_\theta(\rho)=0$ for $|\rho|>f_c$. Detector spacing must satisfy $\Delta r&lt;\tfrac1{2f_c}$.`},
      {q:R`Back-projection $b(x,y)=\int_0^\pi p_\theta(x\cos\theta+y\sin\theta)d\theta$ equals $f*h$ with $h(x,y)=1/\sqrt{x^2+y^2}$. Show $H(u,v)=1/\sqrt{u^2+v^2}$ using $\delta(t)=\int e^{j2\pi rt}dr$.`,
       a:R`In polar coordinates $H(u,v)=\int_{-\pi/2}^{\pi/2}\int_{-\infty}^{\infty}\tfrac1{|r|}e^{-j2\pi r(u\cos\theta+v\sin\theta)}|r|\,dr\,d\theta=\int_{-\pi/2}^{\pi/2}\delta(u\cos\theta+v\sin\theta)d\theta$. Writing $(u,v)=\rho(\cos\phi,\sin\phi)$: $\delta(\rho\cos(\theta-\phi))$ integrates over the single zero of $\cos(\theta-\phi)$ in the interval to $\dfrac1{\rho|\sin(\theta-\phi)|}=\dfrac1\rho$. Hence $H=1/\rho=1/\sqrt{u^2+v^2}$.`},
      {q:R`Use c) to derive filtered back-projection.`,
       a:R`Since $B(u,v)=F(u,v)/\rho$, multiply each projection's spectrum by the ramp $|\rho|$ before back-projecting: $f(x,y)=\int_0^\pi\Big[\int P_\theta(\rho)|\rho|e^{j2\pi\rho r}d\rho\Big]_{r=x\cos\theta+y\sin\theta}d\theta$. Equivalently, in polar frequency coordinates $dudv=|\rho|d\rho d\theta$, so the inverse CSFT of $F$ written on radial slices is exactly the ramp-filtered back-projection.`},
      {q:R`Which is harder to undo by deconvolution: blur by $1/\sqrt{x^2+y^2}$ or blur by $\mathrm{sinc}(x,y)$? Why?`,
       a:R`$\mathrm{sinc}(x,y)$. Its CSFT $\mathrm{rect}(u,v)$ is exactly zero outside the unit square, so those frequencies are destroyed and cannot be recovered by any filter. $1/\rho$ decays but never vanishes, so multiplication by $\rho$ (the ramp) inverts it, only amplifying noise at high frequencies.`}
     ]}
  ]
 },
 {
  id:"ls", name:"Least squares versus MMSE estimation: training data, random vs. deterministic, deblurring filters", prob:72, trend:"rising",
  years:["2017 P3","2018 P4","2023 P1","2024 P2","2026 P2"],
  evidence: R`Five of eleven, three of the last four. Template: an estimator $\hat X=\theta^tZ$ (or $\hat X=Z\theta$ for a training set); write the loss $\|X-Z\theta\|^2$, minimize to get $\hat\theta=(Z^tZ)^{-1}Z^tX=\hat R^{-1}\hat b$; write the expected loss $a-2b^t\theta+\theta^tR\theta$ and minimize to get $\theta^\ast=R^{-1}b$; say which of $L,\bar L,\hat\theta,\theta^\ast,\hat X$ are random; name the two estimators and their advantages; compute $L(\theta^\ast)$; MMSE is linear for jointly Gaussian data (2018).`,
  concepts:[
   R`Training matrix $Z$ (rows $z_s$ = neighborhood of pixel $s$), targets $X$; least squares $L(\theta)=\tfrac1N\|X-Z\theta\|^2=\hat a-2\hat b^t\theta+\theta^t\hat R\theta$ with $\hat R=\tfrac1NZ^tZ$, $\hat b=\tfrac1NZ^tX$; $\hat\theta=\hat R^{-1}\hat b$; $\hat X=Z\hat\theta=Z(Z^tZ)^{-1}Z^tX$ is the projection of $X$ onto the column space of $Z$; $L(\hat\theta)=\tfrac1N(\|X\|^2-\|\hat X\|^2)$.`,
   R`Expected loss $\bar L(\theta)=E[L(\theta)]=a-2b^t\theta+\theta^tR\theta$ with $R=E[z^tz]$, $b=E[z^tx]$; $\theta^\ast=R^{-1}b$ is the MMSE linear estimator. $\bar L,\theta^\ast$ are numbers; $L,\hat\theta,\hat X$ are random variables.`,
   R`LS needs no distribution, only data, but is noisier and optimistic on its own training set ($L(\hat\theta)\le L(\theta^\ast)$ always, while $\bar L(\theta^\ast)\le\bar L(\hat\theta)$). MMSE needs the joint distribution (usually unknown). Report error on held-out data; need $N\gg p$.`,
   R`Gaussian case: $E[X|Y]$ is linear in $Y$, so the MMSE estimator is a linear filter; for real (non-Gaussian) images nonlinear estimators (CNNs) can do better, which is why linear filters are not the best denoisers.`
  ],
  problems:[
   { title:"Learning a deblurring filter", points:40,
     intro: R`For each pixel $s$ of a blurred training image $Y$, let $z_s\in\mathbb R^{1\times P}$ be the row vector of the $P=(2p+1)^2$ pixels around $s$, and let $X_s$ be the sharp value. Stack $N$ pixels into $Z\in\mathbb R^{N\times P}$ and $X\in\mathbb R^N$. The deblurred image is $\hat X=Z\theta$.`,
     parts:[
      {q:R`Is $\hat X$ random or deterministic? Is $\theta$ usually modeled as random or deterministic?`,
       a:R`$\hat X$ is random (a function of the random image $Z$). $\theta$ is treated as deterministic but unknown (frequentist view).`},
      {q:R`Write the average squared error $\mathrm{ASE}(\theta)=\tfrac1N\|X-Z\theta\|^2$ in the form $\hat a-2\hat b^t\theta+\theta^t\hat R\theta$ and minimize it.`,
       a:R`$\hat a=\tfrac1N\|X\|^2$, $\hat b=\tfrac1NZ^tX$, $\hat R=\tfrac1NZ^tZ$. $\nabla=-2\hat b+2\hat R\theta=0\Rightarrow\hat\theta=\hat R^{-1}\hat b=(Z^tZ)^{-1}Z^tX$.`},
      {q:R`Write the mean squared error $\mathrm{MSE}(\theta)=\tfrac1NE\|X-Z\theta\|^2$ in the form $a-2b^t\theta+\theta^tR\theta$ and minimize it.`,
       a:R`$a=\tfrac1NE\|X\|^2$, $b=\tfrac1NE[Z^tX]$, $R=\tfrac1NE[Z^tZ]$; $\theta^\ast=R^{-1}b$.`},
      {q:R`Which of $\hat\theta$, $\theta^\ast$, $\mathrm{ASE}$, $\mathrm{MSE}$ are random? Name the two estimators.`,
       a:R`$\hat\theta$ and $\mathrm{ASE}(\theta)$ are random (functions of data); $\theta^\ast$ and $\mathrm{MSE}(\theta)$ are deterministic (expectations). $\hat X=Z\hat\theta$ is the least-squares estimate; $X^\ast=Z\theta^\ast$ is the (linear) MMSE estimate.`},
      {q:R`Compute $\mathrm{ASE}(\hat\theta)$ in closed form and interpret geometrically.`,
       a:R`$\hat X=Z(Z^tZ)^{-1}Z^tX=\Pi X$ where $\Pi$ is the orthogonal projector onto the column space of $Z$. Then $\mathrm{ASE}(\hat\theta)=\tfrac1N\|X-\Pi X\|^2=\tfrac1N(\|X\|^2-\|\Pi X\|^2)=\hat a-\hat b^t\hat R^{-1}\hat b$: the energy of $X$ orthogonal to the span of the neighborhoods.`},
      {q:R`Compare the two estimators: which has lower error on the training set, which on new images, and what are the practical advantages of each?`,
       a:R`On the training set $\mathrm{ASE}(\hat\theta)\le\mathrm{ASE}(\theta^\ast)$ by construction; on new data $\mathrm{MSE}(\theta^\ast)\le\mathrm{MSE}(\hat\theta)$ since $\theta^\ast$ minimizes expected error. MMSE is optimal but requires the joint distribution (moments $R,b$), which is rarely known; LS only needs training pairs and converges to $\theta^\ast$ as $N\to\infty$ but overfits when $N$ is not $\gg P$. Always report error on held-out test data.`}
     ]}
  ]
 },
 {
  id:"lti", name:"Linear systems and LTI definitions; 2-D sharpening (LSI) filters", prob:80, trend:"rising",
  years:["2016 P4","2019 P1","2024 P1","2025 P1–P2","2026 P4"],
  evidence: R`The last three finals each opened with a definitions problem: prove $f(x)=Ax$ is homogeneous and linear; prove the median is homogeneous but not linear (counterexample); prove any finite-dimensional linear map is a matrix; general form of a linear system on sequences ($\sum_mh_{n,m}x_m$) and of an LTI system (convolution); response of an LTI system to $e^{j\omega n}$; sums and compositions of LTI systems. Sharpening filters $g=\delta+\lambda(\delta-h)$ with a separable $h$ reappeared in 2025 (DC gain, $G(e^{j\mu},e^{j\nu})$, sketch, $\lambda>0$ vs $\lambda&lt;0$).`,
  concepts:[
   R`Homogeneous: $T[\alpha x]=\alpha T[x]$. Additive: $T[x+y]=T[x]+T[y]$. Linear = both. $T[x]=Ax$ is linear; conversely (finite dimensions) linear $\Rightarrow$ $T[x]=\sum_ix_iT[\delta^{(i)}]=Ax$ with columns $e_i=T[\delta^{(i)}]$.`,
   R`Median: homogeneous (scaling preserves order) but not additive: $\mathrm{median}([1,0,0]+[0,1,0])=1\ne0+0$. Squaring $y_n=x_n^2$ is time invariant but nonlinear; $y_n=nx_n$ is linear but not TI; downsampling is linear but not TI.`,
   R`Shift $S_k[x]_n=x_{n-k}$; time invariant iff $T\circ S_k=S_k\circ T$ for all $k$ (only meaningful for sequences on all of $\mathbb Z$). Linear on sequences: $y_n=\sum_mh_{n,m}x_m$; LTI: $h_{n,m}=h_{n-m}$, i.e. convolution. $x_n=e^{j\omega n}\Rightarrow y_n=H(e^{j\omega})e^{j\omega n}$ (eigenfunction).`,
   R`Sum of LTI systems is LTI with $h=a+b$; composition is LTI with $h=a*b$; DC gain $=\sum_kh_k=H(e^{j0})$, typically set to 1 for image filters to keep brightness.`,
   R`Sharpening $g=\delta+\lambda(\delta-h)$ with $h$ separable low-pass of unit DC gain: $G=1+\lambda(1-H)$, DC gain 1, boost $1+\lambda$ where $H=0$; $\lambda>0$ sharpens, $\lambda&lt;0$ blurs.`
  ],
  problems:[
   { title:"Prove or disprove: linearity and time invariance", points:35,
     intro: R`Let $S_k$ denote the shift by $k$ samples. Decide, with proof or counterexample, whether each system is linear and whether it is time invariant.`,
     parts:[
      {q:R`$y_n=x_nx_{n-1}$`,
       a:R`Time invariant: $T[S_kx]_n=x_{n-k}x_{n-k-1}=S_k[T x]_n$. Not linear: $T[2x]=4x_nx_{n-1}\ne2T[x]$ (fails homogeneity).`},
      {q:R`$y_n=n\,x_n$`,
       a:R`Linear: $n(\alpha x_n+\beta z_n)=\alpha nx_n+\beta nz_n$. Not time invariant: $T[S_kx]_n=nx_{n-k}$ but $S_k[Tx]_n=(n-k)x_{n-k}$.`},
      {q:R`$y_n=x_{2n}$ (downsampling)`,
       a:R`Linear (a fixed selection of samples). Not time invariant: for $x=\delta$, $y=\delta$; for $S_1\delta$ (impulse at $n=1$), $y_n=\delta_{2n-1}=0$ for all $n$, which is not a shift of $\delta$.`},
      {q:R`$y=\mathrm{median}(x_{n-1},x_n,x_{n+1})$`,
       a:R`Time invariant (the window slides). Homogeneous (scaling does not change ordering). Not additive: with $x=[\dots,1,0,0,\dots]$ and $z=[\dots,0,1,0,\dots]$ positioned in one window, $\mathrm{median}(x+z)=\mathrm{median}(1,1,0)=1$ but $\mathrm{median}(x)+\mathrm{median}(z)=0+0=0$. So nonlinear.`},
      {q:R`Let $T:\mathbb R^N\to\mathbb R^M$ be linear. Prove there is a matrix $A$ with $T[x]=Ax$.`,
       a:R`Write $x=\sum_ix_i\delta^{(i)}$ where $\delta^{(i)}$ is the $i$-th unit vector. By linearity $T[x]=\sum_ix_iT[\delta^{(i)}]=\sum_ix_ie_i=Ax$ with $A=[e_0\cdots e_{N-1}]$, $e_i=T[\delta^{(i)}]\in\mathbb R^M$.`},
      {q:R`Let $T$ be LTI on sequences with impulse response $h$. Show that $x_n=e^{j\omega n}$ produces $y_n=Ce^{j\omega n}$ and identify $C$.`,
       a:R`$y_n=\sum_mh_mx_{n-m}=\sum_mh_me^{j\omega(n-m)}=e^{j\omega n}\sum_mh_me^{-j\omega m}=H(e^{j\omega})e^{j\omega n}$; $C=H(e^{j\omega})$, the frequency response. Complex exponentials are eigenfunctions of LTI systems.`},
      {q:R`If $T_1$ and $T_2$ are LTI with impulse responses $a$ and $b$, what are the impulse responses of $T_1+T_2$ and $T_1\circ T_2$? What DC gain do you normally want for an image filter and why?`,
       a:R`$T_1+T_2$: $a_n+b_n$; $T_1\circ T_2$: $(a*b)_n=\sum_ka_kb_{n-k}$ (both LTI). DC gain $\sum_nh_n=1$ so that flat regions and the mean brightness are unchanged.`}
     ]},
   { title:"A separable sharpening filter", points:30,
     intro: R`Let $h(m,n)=h_1(m)h_1(n)$ with $h_1(n)=\tfrac1{2+2c}\big[c\,\delta(n+1)+2\delta(n)+c\,\delta(n-1)\big]$, $0&lt;c\le1$, and $g(m,n)=\delta(m,n)+\lambda[\delta(m,n)-h(m,n)]$.`,
     parts:[
      {q:R`Verify that $h$ has unit DC gain and compute $H(e^{j\mu},e^{j\nu})$.`,
       a:R`$\sum h_1=\tfrac{2+2c}{2+2c}=1$, so $\sum_{m,n}h=1$. $H_1(e^{j\omega})=\dfrac{2+2c\cos\omega}{2+2c}=\dfrac{1+c\cos\omega}{1+c}$ and $H=\dfrac{(1+c\cos\mu)(1+c\cos\nu)}{(1+c)^2}$.`},
      {q:R`Compute $G(e^{j\mu},e^{j\nu})$ and its DC gain.`,
       a:R`$G=1+\lambda(1-H)$; at $(0,0)$, $H=1$ so $G=1$: the mean is preserved for every $\lambda$.`},
      {q:R`For $c=1$, sketch $G(e^{j\mu},e^{j0})$ for $\lambda=1$ and give the maximum of $G$ over the plane.`,
       a:R`With $c=1$: $H(e^{j\mu},e^{j0})=\tfrac12(1+\cos\mu)$, so $G=1+1\cdot[1-\tfrac12(1+\cos\mu)]=\tfrac32-\tfrac12\cos\mu$: 1 at $\mu=0$, 2 at $\mu=\pm\pi$. Over the plane the maximum is at $(\pi,\pi)$ where $H=0$: $G=1+\lambda=2$.`},
      {q:R`Describe the effect of $\lambda>0$ and $\lambda&lt;0$, and explain the connection between $\delta-h$ and the Laplacian.`,
       a:R`$\lambda>0$ boosts frequencies where $H&lt;1$: sharpening (unsharp masking). $\lambda&lt;0$ attenuates them: blurring. $\delta-h$ is a discrete high-pass with zero DC gain; for small $\mu,\nu$, $1-H\approx\tfrac{c}{2(1+c)}(\mu^2+\nu^2)$, proportional to $-\nabla^2$, so $g\approx\delta-\lambda'\nabla^2$: sharpening subtracts a scaled Laplacian.`},
      {q:R`How many multiplies per pixel does a separable implementation of $g$ need compared with direct $3\times3$ convolution with $g$?`,
       a:R`Separable: 3 (rows) $+$ 3 (columns) for $h$, then 2 to form $(1+\lambda)x-\lambda(h*x)$: 8 (fewer if the symmetric taps are combined by additions first: $2+2+2=6$). Direct: 9. The advantage grows as $2K$ versus $K^2$ for $K\times K$ kernels.`}
     ]}
  ]
 },
 {
  id:"rpfinal", name:"Random processes: AR analysis / synthesis, PSD through filters, 2-D AR textures", prob:48, trend:"stable",
  years:["2016 P1","2019 P4","2020 Q2","2024 P5"],
  evidence: R`Four of eleven finals. Beyond the Exam 2 versions: the 2-D separable AR texture $Y=X+aY(m-1,n)+bY(m,n-1)-abY(m-1,n-1)$ with its power spectrum and MMSE causal predictor, the autocovariance of filtered white noise, and the analysis/synthesis flow diagrams of 2024 (LS-fit predictor, whitened residual scaled by $1/\sigma_\epsilon$, then the inverse IIR system driven by $N(0,1)$ noise).`,
  concepts:[
   R`Stable causal AR: $y_n=\sum_{i=1}^Ph_iy_{n-i}+x_n$ with white $x_n$ ($\sigma^2$): $S_y=\dfrac{\sigma^2}{|1-\sum_ih_ie^{-j\omega i}|^2}$; $\hat y_n=E[y_n|y_{i&lt;n}]=\sum_ih_iy_{n-i}$ exactly, because $x_n$ is independent of the past.`,
   R`Filtered white noise: $R_y(k)=\sigma^2(h*h_{-})(k)$; e.g. $h=\delta-\tfrac12(\delta_{n-1}+\delta_{n+1})$ gives $S_y=\sigma^2(1-\cos\omega)^2$ and $R_y=\sigma^2[\tfrac32\delta(k)-(\delta(k\pm1))+\tfrac14\delta(k\pm2)]$.`,
   R`Analysis: fit $\hat\theta=\hat R^{-1}\hat b$ by least squares, form $\epsilon_n=y_n-z_n\hat\theta$ (white, variance $\sigma_\epsilon^2$), scale $w_n=\epsilon_n/\sigma_\epsilon\sim N(0,1)$. Synthesis: $\epsilon_n=\sigma_\epsilon w_n$, $y_n=\epsilon_n+\sum_iy_{n-i}\hat\theta_i$ (IIR with feedback).`,
   R`2-D separable AR: $H=\dfrac1{(1-ae^{-j\mu})(1-be^{-j\nu})}$, $S_Y=\dfrac{\sigma^2}{|1-ae^{-j\mu}|^2|1-be^{-j\nu}|^2}$, $h=a^mb^nu(m)u(n)$; MMSE predictor $aY(m-1,n)+bY(m,n-1)-abY(m-1,n-1)$; the spectrum is a low-pass peak at DC, elongated along the axis with the larger coefficient.`
  ],
  problems:[
   { title:"A 2-D AR texture and its analysis/synthesis", points:35,
     intro: R`Let $X(m,n)$ be i.i.d. $N(0,1)$ and $Y(m,n)=X(m,n)+0.9Y(m-1,n)+0.5Y(m,n-1)-0.45Y(m-1,n-1)$.`,
     parts:[
      {q:R`Give $R_X$, $S_X$, and the frequency response $H(e^{j\mu},e^{j\nu})$ in simplified (separable) form.`,
       a:R`$R_X(m,n)=\delta(m,n)$, $S_X=1$. $Y(1-0.9e^{-j\mu}-0.5e^{-j\nu}+0.45e^{-j\mu}e^{-j\nu})=X$, so $H=\dfrac1{(1-0.9e^{-j\mu})(1-0.5e^{-j\nu})}$.`},
      {q:R`Compute $S_Y$ and sketch it on $[-\pi,\pi]^2$.`,
       a:R`$S_Y=\dfrac1{(1.81-1.8\cos\mu)(1.25-\cos\nu)}$. A peak at DC of height $\dfrac1{(0.01)(0.25)}=400$, very sharp along $\mu$ (correlation 0.9 gives a narrow ridge) and broad along $\nu$ (correlation 0.5): a texture strongly correlated horizontally.`},
      {q:R`Sketch $h(m,n)$ and describe the texture.`,
       a:R`$h(m,n)=0.9^m0.5^nu(m)u(n)$: decays slowly along $m$ (streaks of length about 10 pixels) and quickly along $n$. Samples look like horizontal streaks.`},
      {q:R`Give the MMSE predictor $\hat Y(m,n)=E[Y(m,n)|Y(l,k)\text{ for }(l,k)\text{ in the causal past}]$ and the prediction-error variance.`,
       a:R`$\hat Y(m,n)=0.9Y(m-1,n)+0.5Y(m,n-1)-0.45Y(m-1,n-1)$; the error is $X(m,n)$ with variance 1.`},
      {q:R`Given only a realization $y$, describe the analysis system that produces i.i.d. $N(0,1)$ samples, and the synthesis system that regenerates a texture with the same statistics; draw both as flow diagrams in words.`,
       a:R`Analysis: form $z_s=[y(m-1,n),y(m,n-1),y(m-1,n-1)]$, fit $\hat\theta=\hat R^{-1}\hat b$ by least squares, compute the residual $\epsilon_s=y_s-z_s\hat\theta$ (an FIR "whitening" filter), estimate $\sigma_\epsilon^2$, and scale $w_s=\epsilon_s/\sigma_\epsilon$. Diagram: $y\to$ FIR $(1-\hat\theta)$ $\to\epsilon\to\times\tfrac1{\sigma_\epsilon}\to w$. Synthesis: $w\sim N(0,1)$ i.i.d. $\to\times\sigma_\epsilon\to\epsilon\to$ IIR recursion $y_s=\epsilon_s+z_s\hat\theta$ $\to\tilde y$. Diagram: the inverse of the analysis filter with feedback of past outputs.`}
     ]}
  ]
 },
 {
  id:"mri", name:"MRI (1-D rod, k-space, reconstruction)", prob:40, trend:"stable",
  years:["2016 P2","2019 P2","2026 P3"],
  evidence: R`Three finals, most recently 2026: $\omega(x,t)=\omega_0+x\gamma G(t)$, $\phi=\omega_0t+xk(t)$, $r(x,t)=a(x)e^{j\phi}$, $r(t)=e^{j\omega_0t}A(-k(t)/2\pi)$ (in cycles) and the reconstruction recipe (demodulate, map samples to $A(f)$, inverse transform). See the Exam 1 MRI topic for the full concept list and problems.`,
  concepts:[
   R`$\omega(x,t)=\gamma M(x,t)=\omega_0+\gamma G(t)x$; $\phi(x,t)=\omega_0t+xk(t)$ with $k(t)=\gamma\int_0^tG(\tau)d\tau$.`,
   R`$r(t)=\int a(x)e^{j\phi(x,t)}dx=e^{j\omega_0t}\int a(x)e^{jxk(t)}dx=e^{j\omega_0t}A\!\big(-\tfrac{k(t)}{2\pi}\big)$ with $A(f)=\int a(x)e^{-j2\pi fx}dx$ in cycles/cm.`,
   R`Reconstruction: demodulate $s(t)=r(t)e^{-j\omega_0t}$, assign $A(f)$ at $f=-k(t)/2\pi$, inverse Fourier transform. Sampling in $k$ sets the field of view; $k_{\max}$ sets resolution.`
  ],
  problems:[
   { title:"MRI readout with a sinusoidal gradient", points:30,
     intro: R`A rod along $x$ has density $a(x)$ supported on $|x|\le L/2$, with CTFT $A(f)=\int a(x)e^{-j2\pi fx}dx$. After excitation at $t=0$, the gradient is $G(t)=G_0\sin(\Omega t)$ for $0\le t\le\pi/\Omega$ (half a period). $\omega_0=\gamma M_0$ and $k(t)=\gamma\int_0^tG(\tau)d\tau$.`,
     parts:[
      {q:R`Compute $k(t)$ and sketch it. What are its minimum and maximum values, and is k-space covered symmetrically?`,
       a:R`$k(t)=\dfrac{\gamma G_0}{\Omega}(1-\cos\Omega t)$, rising from $0$ at $t=0$ to $k_{\max}=2\gamma G_0/\Omega$ at $t=\pi/\Omega$, with zero slope at both ends. Only $k\ge0$ is covered: not symmetric. (Because $a$ is real, $A(-f)=A(f)^\ast$, so half of k-space suffices in principle, but noise and phase errors make full coverage preferable; a negative pre-phase lobe would center the sweep.)`},
      {q:R`Write $r(t)$ and the demodulated signal $s(t)=r(t)e^{-j\omega_0t}$ in terms of $A$.`,
       a:R`$\phi(x,t)=\omega_0t+xk(t)$, $r(t)=\int a(x)e^{j\phi}dx=e^{j\omega_0t}A\big(-k(t)/2\pi\big)$, so $s(t)=A\big(-\tfrac{k(t)}{2\pi}\big)$.`},
      {q:R`The receiver samples $s(t)$ uniformly every $\Delta t$. Are the resulting k-space samples uniformly spaced? Where are they densest?`,
       a:R`No: $\Delta k\approx\gamma G(t)\Delta t=\gamma G_0\sin(\Omega t)\Delta t$ varies with time. Samples are densest near $t=0$ and $t=\pi/\Omega$ (where the gradient, hence the k-space velocity, is near zero) and sparsest at $t=\pi/2\Omega$ where $|G|$ is maximal.`},
      {q:R`Why can you not simply apply an inverse FFT to these samples, and what two remedies exist?`,
       a:R`The FFT assumes uniform k-space samples; nonuniform samples would reconstruct a distorted image. Remedies: (i) resample/interpolate (gridding) the measured $A$ onto a uniform k grid, with density compensation weights proportional to $|G(t)|$; or (ii) sample non-uniformly in time, at instants $t_n$ chosen so that $k(t_n)=n\Delta k$, i.e. $t_n=\tfrac1\Omega\arccos\big(1-\tfrac{n\Omega\Delta k}{\gamma G_0}\big)$.`},
      {q:R`With uniform k-spacing $\Delta k$ achieved by remedy (ii), state the anti-aliasing condition on $\Delta k$ and the resolution obtained from $k_{\max}$.`,
       a:R`Field of view $2\pi/\Delta k\ge L\Rightarrow\Delta k\le2\pi/L$. Resolution $\delta x\approx\pi/k_{\max}=\dfrac{\pi\Omega}{2\gamma G_0}$: a stronger or slower gradient sweep gives finer resolution.`}
     ]}
  ]
 },
 {
  id:"halftone", name:"Halftoning: white-noise screens, error diffusion (sigma–delta), display error spectra", prob:30, trend:"falling",
  years:["2016 P3","2018 P2","2020 Q5","2022 Q2"],
  evidence: R`Four finals 2016–2022, none since. The white-noise-screen problem: $b=1$ if $g\ge T$ with $T\sim U[0,1]$; $E[b]=g$, $\mathrm{Var}=g(1-g)$, display error autocovariance $g(1-g)\delta(k,l)$, flat PSD, and why that is bad (low-frequency error is visible through the HVS). The 2016 class-D amplifier problem is error diffusion in disguise: show the quantization error is high-pass filtered.`,
  concepts:[
   R`Random threshold halftone of constant gray $g$: $P\{b=1\}=g$, $E[b]=g$, $\mathrm{Var}(b)=g(1-g)$; display error $d=b-g$ has mean 0, autocovariance $g(1-g)\delta(k,l)$ (thresholds i.i.d.), power spectrum $g(1-g)$: white. Strict-sense stationary because the distribution does not depend on position.`,
   R`Why white noise screens look bad: the error has as much power at low frequencies as high, and the eye's contrast sensitivity passes low frequencies, so the noise is visible. Good halftones push error to high frequencies (blue noise) where the eye's MTF attenuates it.`,
   R`Error diffusion (1-D sigma–delta): $\tilde x_n=x_n+e_{n-1}$, $b_n=Q(\tilde x_n)$, $e_n=\tilde x_n-b_n$. Then $B=X+E(e^{-j\omega}-1)$: the quantization error is shaped by $1-e^{-j\omega}$ (high-pass, zero at DC), so the average of $b$ tracks $x$. A low-pass (the eye, or an RC filter) then removes the error; sample fast and set the cutoff well below $f_s$.`,
   R`Ordered dither (clustered vs. dispersed dot) trades gray-level resolution against spatial resolution.`
  ],
  problems:[
   { title:"Ordered dither with a Bayer screen", points:30,
     intro: R`A $2\times2$ Bayer threshold array is tiled over the image: $T(m,n)=\tfrac18\begin{bmatrix}1&5\\7&3\end{bmatrix}$ (indexed by $m\bmod2$, $n\bmod2$), and the halftone is $b(m,n)=1$ if $g(m,n)\ge T(m,n)$, else 0, for $g\in[0,1]$.`,
     parts:[
      {q:R`For constant gray $g$, how many distinct output patterns (gray levels) can this screen produce? List the number of dots per $2\times2$ cell as a function of $g$.`,
       a:R`Thresholds are $\tfrac18,\tfrac38,\tfrac58,\tfrac78$. Dots per cell: 0 for $g&lt;\tfrac18$; 1 for $\tfrac18\le g&lt;\tfrac38$; 2 for $\tfrac38\le g&lt;\tfrac58$; 3 for $\tfrac58\le g&lt;\tfrac78$; 4 for $g\ge\tfrac78$. Five gray levels; an $N\times N$ screen gives $N^2+1$ levels.`},
      {q:R`For $g=0.5$ write the output pattern and the display error $d=b-g$. Is $d$ a random process?`,
       a:R`Thresholds $\tfrac18$ and $\tfrac38$ are exceeded: $b=\begin{bmatrix}1&0\\0&1\end{bmatrix}$ tiled, a checkerboard. $d=\pm\tfrac12$ in the same pattern. It is deterministic and periodic (period 2 in both directions), not random.`},
      {q:R`Compute the DSFT (power spectrum) of the error for $g=0.5$ and locate its energy.`,
       a:R`$d(m,n)=\tfrac12(-1)^{m+n}$, whose DSFT is an impulse at $(\mu,\nu)=(\pi,\pi)$ (plus $2\pi$ replicas): all error energy sits at the highest spatial frequency, where the eye's contrast sensitivity is lowest. The mean error is zero.`},
      {q:R`Compare with a white-noise threshold screen for the same $g$: mean, variance and spectrum of the error, and which halftone looks better and why.`,
       a:R`White noise: mean 0, variance $g(1-g)=\tfrac14$, flat spectrum (equal energy at all frequencies, including visible low frequencies). Ordered dither: mean 0, variance $\tfrac14$ too, but all energy at $(\pi,\pi)$. Same error power, very different visibility: the dither pattern is blurred away by the eye while white noise leaves grain. Its drawback is the periodic texture and the coarse gray-level quantization for small screens.`},
      {q:R`Explain how error diffusion improves on both, in terms of the error spectrum and the number of gray levels.`,
       a:R`Error diffusion feeds back the quantization error through a causal filter so that the output error is shaped by $1-H(e^{j\omega})$ (a high-pass with zero DC gain): the error is pushed to high frequencies like dither, but aperiodically (no visible texture), and local averages of $b$ track $g$ continuously, so effectively arbitrary gray levels are reproduced instead of $N^2+1$.`}
     ]}
  ]
 },
 {
  id:"bilateral", name:"Bilateral filter: nonlinearity, space invariance, parameter selection", prob:25, trend:"falling",
  years:["2016 P5","2020 Q3","2022 Q5"],
  evidence: R`Three finals 2016–2022. Asks: what the bilateral filter is for (edge-preserving denoising), why the weights must be normalized (DC gain 1), how to pick $\sigma_x$ relative to the noise level and the edge contrast, the effect of $\sigma_s$, a proof that it is not linear (scale an impulse), and that it is space invariant (weights depend only on relative position and values).`,
  concepts:[
   R`$y_s=\sum_rw_{s,r}x_r$, $w_{s,r}=\tilde w_{s,r}/\sum_k\tilde w_{s,k}$, $\tilde w_{s,r}=\exp\{-\|s-r\|^2/2\sigma_s^2\}\exp\{-|x_s-x_r|^2/2\sigma_x^2\}$: a Gaussian blur whose weights are also reduced for pixels with very different values.`,
   R`Constant input returns the constant (normalization gives DC gain 1). Not linear: for a tiny impulse the range kernel is $\approx1$ and the output is a blurred impulse, while for a huge impulse the output is the impulse itself; scaling fails. Space invariant: weights depend only on $s-r$ and $x_s-x_r$.`,
   R`$\sigma_x$: comparable to or a few times the noise standard deviation but much smaller than the edge contrast, so same-region pixels are averaged and cross-edge pixels excluded; $\sigma_x\to\infty$ gives Gaussian blur, $\sigma_x\to0$ gives no smoothing. $\sigma_s$: spatial extent; larger reduces noise variance more (and costs more).`,
   R`At a high-contrast step edge the output is approximately the mean of the same-side pixels: the edge is preserved. Disadvantage: $O(\text{window})$ nonlinear cost per pixel, no frequency-domain analysis.`
  ],
  problems:[
   { title:"Bilateral filter versus Gaussian blur on an outlier and a corner", points:25,
     intro: R`Use the bilateral filter $y_s=\sum_rw_{s,r}x_r$ with $\tilde w_{s,r}=\exp\{-\|s-r\|^2/2\sigma_s^2\}\exp\{-|x_s-x_r|^2/2\sigma_x^2\}$, normalized weights, $\sigma_s=2$, $\sigma_x=5$. Image A is $x_s=0$ everywhere except $x_0=100$ (one hot pixel). Image B is $x_s=100$ on the quadrant $s_1\le0,s_2\le0$ and $0$ elsewhere (a corner), both plus small noise of standard deviation 1.`,
     parts:[
      {q:R`For image A, approximate the bilateral output at the hot pixel and at a neighbor. Compare with a Gaussian blur of the same $\sigma_s$.`,
       a:R`At $s=0$: every other pixel differs by 100, range weight $e^{-200}\approx0$, so only $r=0$ contributes: $y_0\approx100$. At a neighbor $s$: the hot pixel has range weight $\approx0$, so $y_s\approx$ average of the zeros $\approx0$ (noise reduced). The bilateral filter leaves the outlier intact and untouched; a Gaussian blur spreads it into a faint blob of peak $\approx100/(2\pi\sigma_s^2)\approx4$.`},
      {q:R`What does part a) imply about using the bilateral filter to remove salt-and-pepper (impulse) noise, and what filter should be used instead?`,
       a:R`It cannot remove isolated impulses: an outlier is dissimilar to all its neighbors, so it becomes its own only support. Use a median filter (or a rank-order/ADM filter), which discards extreme values by ordering rather than averaging.`},
      {q:R`For image B, approximate the output at the corner pixel $s=(0,0)$ and at a pixel on the flat side far from the edges. Is the corner rounded?`,
       a:R`At the corner pixel (value 100) only same-quadrant pixels (also 100) get weight $\approx1$; the other three quadrants (value 0) get $\approx0$. So $y\approx100$: the corner stays sharp. Far from edges all neighbors are similar and the filter reduces to a Gaussian average: noise standard deviation drops from 1 to about $1/\sqrt{4\pi\sigma_s^2}\approx0.14$. A Gaussian blur would round the corner (25 at the corner point, ramps of width about $2\sigma_s$).`},
      {q:R`How should $\sigma_x$ be chosen relative to the noise standard deviation and to the edge contrast, and what happens if the noise standard deviation were 30 instead of 1?`,
       a:R`Want noise-sized differences to pass ($\sigma_x\gtrsim$ a few times the noise standard deviation) but edge-sized differences to be rejected ($\sigma_x\ll100$): $\sigma_x=5$ satisfies both for noise 1. With noise 30 no $\sigma_x$ works: either the noise is rejected too (little smoothing) or the 100-edge leaks; the filter degrades toward either identity or Gaussian blur.`},
      {q:R`Prove the filter is not linear but is space invariant.`,
       a:R`Nonlinear: from a), $F[100\,\delta]=100\,\delta$ but $F[\epsilon\,\delta]\approx\epsilon\,g_{\sigma_s}$ (a blurred impulse) for $\epsilon\ll\sigma_x$, so $F[100\delta]\ne\tfrac{100}\epsilon F[\epsilon\delta]$. Space invariant: the weights depend only on $s-r$ and $x_s-x_r$, so shifting the image shifts the output.`}
     ]}
  ]
 },
 {
  id:"colorfinal", name:"Colorimetry (final version): white point and primaries from the transform matrix", prob:30, trend:"stable",
  years:["2021 Q2","2025 P5"],
  evidence: R`Two finals: the full chromaticity-diagram problem (2021) and a matrix problem (2025): given $B$ with $[r_0,g_0,b_0]^t=B[x_0,y_0,z_0]^t$ (rgb CMFs from XYZ CMFs), argue the rgb CMFs cannot be strictly positive, compute the white point from $B^{-1}\mathbf 1$, the red primary's chromaticity from the first column of $B^{-1}$, and apply gamma correction. See Exam 2 colorimetry for the core concepts.`,
  concepts:[
   R`If $[r,g,b]^t=B[X,Y,Z]^t$ then $[X,Y,Z]^t=B^{-1}[r,g,b]^t=M[r,g,b]^t$; columns of $M=B^{-1}$ are the XYZ of the primaries; $M\mathbf 1$ is the XYZ of white.`,
   R`Chromaticity from tristimulus: $(x,y)=\big(\tfrac{X}{X+Y+Z},\tfrac{Y}{X+Y+Z}\big)$.`,
   R`Real primaries $\Rightarrow$ rgb CMFs have negative lobes; XYZ CMFs are non-negative. Gamma correction $\tilde r=(r/255)^{1/\gamma}$ (times 255).`
  ],
  problems:[
   { title:"Reading primaries and white point off the transform", points:25,
     intro: R`Let $B$ be the $3\times3$ matrix mapping the XYZ color matching functions to the rgb color matching functions of a display with physical primaries: $[r_0,g_0,b_0]^t=B[x_0,y_0,z_0]^t$ (each a vector in $\mathbb R^{31}$), and let $M=B^{-1}$.`,
     parts:[
      {q:R`Can $r_0,g_0,b_0$ be strictly positive? Why?`,
       a:R`No. Spectral colors lie outside any triangle of real primaries, so matching some wavelengths requires a negative amount of a primary; the corresponding CMF is negative there.`},
      {q:R`Explain how to compute the white point $(x_w,y_w)$ from $M$.`,
       a:R`White is $r=g=b=1$: $[X_w,Y_w,Z_w]^t=M\mathbf 1$, then $x_w=\dfrac{X_w}{X_w+Y_w+Z_w}$, $y_w=\dfrac{Y_w}{X_w+Y_w+Z_w}$.`},
      {q:R`Explain how to compute the chromaticity of the green primary.`,
       a:R`$[X_g,Y_g,Z_g]^t=M[0,1,0]^t$ (second column of $M$), then normalize: $(x_g,y_g)=\big(\tfrac{X_g}{X_g+Y_g+Z_g},\tfrac{Y_g}{X_g+Y_g+Z_g}\big)$.`},
      {q:R`Given linear $(r,g,b)\in[0,255]$, write the gamma-corrected values for $\gamma=2.4$ and state why this step is done before 8-bit storage.`,
       a:R`$\tilde r=255(r/255)^{1/2.4}$ and similarly for $g,b$. The power law expands dark values so that uniform 8-bit quantization of $\tilde r$ produces roughly uniform perceptual steps and no contouring in shadows; it also pre-compensates the display's $\gamma$.`}
     ]}
  ]
 },
 {
  id:"cnn", name:"CNN parameter counting and training versus test loss", prob:20, trend:"falling",
  years:["2019 P5","2020 Q4","2021 Q3"],
  evidence: R`Three finals 2019–2021 (this material later moved to ECE 60146): count parameters per convolutional layer (kernel $\times$ input channels $\times$ output channels $+$ bias), total parameters, explain why test loss exceeds training loss, and how to improve (more data, regularization, smaller model); training/validation/test set naming and what to report in a paper.`,
  concepts:[
   R`Conv layer with $k\times k$ kernels, $C_{in}$ input and $C_{out}$ output channels: $k^2C_{in}C_{out}+C_{out}$ parameters; $W$ has rank 4 with shape $C_{in}\times C_{out}\times k\times k$, $b$ rank 1 with $C_{out}$ entries.`,
   R`Advantages over fully connected: far fewer parameters, less data and compute, space invariance. Test loss $>$ training loss because parameters were fit to the training set (overfitting); fixes: more data, regularization, dropout, early stopping, smaller model. Report test (not training) error; never tune on the test set.`
  ],
  problems:[
   { title:"Parameter count for a small denoising CNN", points:20,
     intro: R`A CNN maps a $128\times128\times3$ noisy image to a $128\times128\times3$ estimate with three $3\times3$ convolutional layers ("same" boundary) of $3\to16$, $16\to16$, $16\to3$ channels, each followed by ReLU except the last.`,
     parts:[
      {q:R`Give the shape and rank of $W$ and $b$ in each layer and the number of parameters per layer.`,
       a:R`Layer 1: $W$ rank 4, $3\times16\times3\times3$ (432) and $b\in\mathbb R^{16}$: 448. Layer 2: $16\times16\times3\times3$ (2304) $+16$: 2320. Layer 3: $16\times3\times3\times3$ (432) $+3$: 435.`},
      {q:R`Total number of parameters, and the count for a fully connected layer replacing layer 1.`,
       a:R`$448+2320+435=3203$. A fully connected layer 1 would need $(128\cdot128\cdot3)\times(128\cdot128\cdot16)+16\cdot128^2\approx1.3\times10^{10}$ weights.`},
      {q:R`After training on 100 images the training loss is $(0.01)^2$ and the test loss $(0.15)^2$. Explain and propose fixes.`,
       a:R`The network has memorized the small training set (overfitting): it fits training noise and does not generalize. Fixes: many more training images (the most effective), data augmentation, weight decay or dropout, early stopping using a validation set, or a smaller model; predict the noise (residual learning) to ease training.`}
     ]}
  ]
 },
 {
  id:"misc", name:"Occasional topics: rate–distortion for Gaussian sources, EM plane waves, DT low-pass windowing", prob:15, trend:"falling",
  years:["2018 P5","2023 P2–P3"],
  evidence: R`One-off problems: Gaussian rate–distortion $R(\delta)=\max\{\tfrac12\log(\sigma^2/\delta),0\}$, $D(\delta)=\min\{\sigma^2,\delta\}$ extended to independent components and to correlated vectors via the KLT (2018); plane-wave solutions of the wave equation, $c=f_0/\|v\|$, wavelength, light travels about 30 cm per ns (2023); ideal DT low-pass with $h_n=T\mathrm{sinc}(Tn)$, windowing and the rectangular window's sidelobes (2023).`,
  concepts:[
   R`Gaussian source $N(0,\sigma^2)$ with quantizer step parameter $\delta$: $R=\max\{\tfrac12\log_2(\sigma^2/\delta),0\}$ bits, $D=\min\{\sigma^2,\delta\}$; for independent components sum rates and distortions (reverse water-filling, common $\delta$); for $N(0,R)$ decorrelate with $E^t$ first (KLT), then code eigen-components.`,
   R`$E(r,t)=E_0e^{j2\pi v\cdot r}e^{-j2\pi f_0t}$ solves $\nabla^2E-\tfrac1{c^2}\partial_t^2E=0$ iff $f_0/\|v\|=c$; wavelength $1/\|v\|=c/f_0$ (3 cm at 10 GHz); light travels 30 cm in 1 ns; real field $A_0\cos(2\pi(v\cdot r-f_0t)+\theta)$.`,
   R`Ideal DT low-pass: $h_n=T\mathrm{sinc}(Tn)$ with $T=\omega_c/\pi$; must be windowed for streaming; the rectangular window has the largest sidelobes.`
  ],
  problems:[
   { title:"Rate–distortion with a KLT and a plane wave check", points:25,
     intro: R`Part A: $Y\sim N(0,R)$ with $R=E\Lambda E^t$, $\Lambda=\mathrm{diag}(16,4,1)$. Part B: $E(x,y,z,t)=E_0\exp\{j2\pi(v\cdot r)\}\exp\{-j2\pi f_0t\}$.`,
     parts:[
      {q:R`Explain how to compute the distortion–rate function of $Y$ and evaluate $R$ and $D$ at $\delta=4$.`,
       a:R`Transform $\tilde Y=E^tY$, whose components are independent with variances 16, 4, 1; code each with the same $\delta$: $R(\delta)=\sum_k\max\{\tfrac12\log_2(\lambda_k/\delta),0\}$, $D(\delta)=\sum_k\min\{\lambda_k,\delta\}$. At $\delta=4$: $R=\tfrac12\log_2 4+0+0=1$ bit, $D=4+4+1=9$. Components with variance below $\delta$ get zero bits (reverse water-filling).`},
      {q:R`Sketch the distortion–rate curve and explain its meaning.`,
       a:R`$D$ decreases from $\mathrm{tr}(R)=21$ at $R=0$ and is convex decreasing; each additional bit reduces distortion less. It gives the minimum achievable mean squared error at a given bit rate for this Gaussian source.`},
      {q:R`Show the plane wave solves $\nabla^2E-\tfrac1{c^2}\partial_t^2E=0$ and find the required relation between $f_0$, $v$ and $c$.`,
       a:R`$\nabla^2E=-(2\pi)^2\|v\|^2E$ and $\partial_t^2E=-(2\pi f_0)^2E$, so the PDE holds iff $\|v\|^2=f_0^2/c^2$, i.e. $c=f_0/\|v\|$.`},
      {q:R`For $f_0=10$ GHz give the free-space wavelength, and the distance light travels in 1 ns.`,
       a:R`$\lambda=c/f_0=3\times10^8/10^{10}=3$ cm; in 1 ns light travels $3\times10^8\times10^{-9}=0.3$ m $\approx$ 1 ft.`}
     ]}
  ]
 }
 ]
};
})();
