window.EXAMDB = window.EXAMDB || {};
(function(){
const R = String.raw;
const C = window.EXAMDB.ece637 = window.EXAMDB.ece637 || {id:"ece637", code:"ECE 63700 (ECE 637)", title:"Digital Image Processing I", exams:{}};
C.exams.exam1 = {
 id:"exam1", name:"Exam 1", years:"Spring 2016 – Spring 2026 (11 exams)",
 format:"3–4 problems, 50 min, closed book with the CTFT/DTFT/CSFT fact sheet",
 mockCount:4, mockTime:"50 minutes",
 notes: R`<b>What the last eleven Exam 1s look like.</b> Exam 1 covers the first third of the course: 2-D continuous and discrete Fourier transforms (CSFT, DSFT), 2-D plane waves, LSI filters and separability, sampling and reconstruction, and the physics-to-math of imaging systems (X-ray transmission tomography and MRI). Every exam since 2023 has a transmission-CT / Beer–Lambert problem, and almost every exam has a plane-wave or basic CSFT-pairs problem. Sharpening/unsharp-mask filters dominated 2016–2022; since 2023 the third problem rotates among sampling, MRI, the forward projection (Fourier slice theorem), and DSFT projection proofs. Units and sketches are graded.`,
 categories:[
 {
  id:"ct", name:"X-ray transmission CT: Beer–Lambert law, photon counting, blank/object scans", prob:88, trend:"rising",
  years:["2017 P3","2020 P2","2023 P2","2025 P3","2026 P4"],
  evidence: R`Five of eleven exams overall, but four of the last four (2023, 2024 skipped it only because the tomography problem was Fourier-slice; 2025, 2026). Standard asks: write $d\lambda_x/dx=-\mu(x)\lambda_x$, solve it, express $\int_0^T\mu\,dx=-\log(\lambda_T/\lambda_0)$, explain blank vs. object scan, write the Poisson pmf of the counts, sketch $y$ versus $\lambda$ or versus $\mu_0$, and discuss photon starvation. Also appears on the final almost every year.`,
  concepts:[
   R`Photon flux obeys $\dfrac{d\lambda_x}{dx}=-\mu(x)\lambda_x$ ($\mu$ in cm$^{-1}$, $x$ in cm), so $\lambda_x=\lambda_0\exp\{-\int_0^x\mu(t)dt\}$ (Beer–Lambert).`,
   R`Projection integral $y=\int_0^T\mu(t)dt=-\log(\lambda_T/\lambda_0)$. Measured counts are Poisson: $Y_T\sim\mathrm{Pois}(\lambda_T)$, $P\{Y_T=k\}=e^{-\lambda_T}\lambda_T^k/k!$; estimate $\hat y=-\log(Y_T/Y_0)$ using a blank scan $Y_0$ (object removed) and an object scan $Y_T$.`,
   R`The ratio cancels source intensity, detector gain and exposure time; the sinogram is the negative log of the transmission $T=Y_T/Y_0\in(0,1]$. This is the preprocessing before filtered back-projection.`,
   R`Piecewise-constant slab: $y=\mu_0(t_1-t_0)$ is linear in $\mu_0$ and in path length; $\lambda_T=\lambda_0e^{-\mu_0L}$ decays exponentially, so thick or dense objects give very few photons (photon starvation) and the log estimate becomes noisy or undefined ($Y_T=0$).`,
   R`Noise: $\mathrm{Var}(\hat y)\approx1/\lambda_T$ (delta method), so variance grows exponentially with attenuation. Polychromatic sources give beam hardening (final-exam topic).`,
   R`Photon energy $E=h\nu=hc/\lambda_{\text{wavelength}}$; higher keV means shorter wavelength and (for most materials) smaller $\mu$.`
  ],
  problems:[
   { title:"Two-material slab and photon-count noise", points:35,
     intro: R`A pencil beam with expected blank-scan count $\lambda_0$ passes through a slab occupying $0\le x\le T$ with $\mu(x)=\mu_1$ for $0\le x&lt;a$ and $\mu(x)=\mu_2$ for $a\le x\le T$ (all in cm and cm$^{-1}$). The detector counts $Y_T$ photons, modeled as Poisson.`,
     parts:[
      {q:R`Write the differential equation for the expected number of photons $\lambda_x$ at depth $x$ and solve it for $\lambda_T$.`,
       a:R`$\dfrac{d\lambda_x}{dx}=-\mu(x)\lambda_x\Rightarrow\lambda_x=\lambda_0\exp\{-\int_0^x\mu(t)dt\}$, so $\lambda_T=\lambda_0\exp\{-\mu_1a-\mu_2(T-a)\}$.`},
      {q:R`Express the projection integral $y=\int_0^T\mu(t)dt$ in terms of $\lambda_0$ and $\lambda_T$, and give the practical estimator from measured counts.`,
       a:R`$y=\mu_1a+\mu_2(T-a)=-\log(\lambda_T/\lambda_0)$. In practice $\hat y=-\log(Y_T/Y_0)$ where $Y_0$ is the blank-scan count (object removed) and $Y_T$ the object-scan count.`},
      {q:R`Write $P\{Y_T=k\}$.`,
       a:R`$P\{Y_T=k\}=\dfrac{\lambda_T^ke^{-\lambda_T}}{k!}$ with $\lambda_T=\lambda_0e^{-\mu_1a-\mu_2(T-a)}$.`},
      {q:R`Using $\mathrm{Var}(Y_T)=\lambda_T$ and a first-order (delta-method) approximation, show $\mathrm{Var}(\hat y)\approx1/\lambda_T$ and explain the consequence for dense objects.`,
       a:R`$\hat y=-\log Y_T+\log\lambda_0$; $\dfrac{d\hat y}{dY_T}=-1/Y_T\approx-1/\lambda_T$, so $\mathrm{Var}(\hat y)\approx\lambda_T/\lambda_T^2=1/\lambda_T=e^{y}/\lambda_0$. The variance of the projection grows exponentially with the attenuation: highly attenuating paths (metal, thick bone) give noisy or even undefined ($Y_T=0$) measurements. This is photon starvation and produces streak artifacts.`},
      {q:R`Sketch $\lambda_T$ and $y$ as functions of $\mu_1$ for fixed $a,T,\mu_2$. Which is linear?`,
       a:R`$y=\mu_1a+\mu_2(T-a)$ is a straight line with slope $a$ and intercept $\mu_2(T-a)$. $\lambda_T=\lambda_0e^{-\mu_2(T-a)}e^{-\mu_1a}$ is a decaying exponential in $\mu_1$ starting at $\lambda_0e^{-\mu_2(T-a)}$. The log converts the multiplicative physics into the additive line integral that tomography needs.`}
     ]},
   { title:"Why two scans: source non-uniformity and detector gain", points:25,
     intro: R`A fan-beam CT system has a source whose intensity varies with detector position $x$, so the blank-scan expected count is $\lambda_0(x)$, and each detector has an unknown gain $g(x)>0$. With the object in place the expected count is $\lambda(x)$.`,
     parts:[
      {q:R`Write $\lambda(x)$ in terms of $\lambda_0(x)$, $g(x)$ and the path integral $\int_{P_x}\mu(r)dr$ along the ray to detector $x$.`,
       a:R`$\lambda(x)=g(x)\lambda_0(x)\exp\{-\int_{P_x}\mu(r)dr\}$, and the blank scan measures $g(x)\lambda_0(x)$.`},
      {q:R`Show that the projection $y(x)$ is obtained without knowing $g(x)$ or $\lambda_0(x)$.`,
       a:R`$\dfrac{\lambda(x)}{g(x)\lambda_0(x)}=\exp\{-\int_{P_x}\mu\,dr\}$, so $y(x)=-\log\dfrac{\lambda(x)}{g(x)\lambda_0(x)}=-\log\dfrac{\text{object count}}{\text{blank count}}$; gain and source profile cancel in the ratio.`},
      {q:R`Sketch $\lambda_0(x)$, $\lambda(x)$ and $y(x)$ across the detector for a uniform disk object centered on the axis.`,
       a:R`$\lambda_0(x)$: roughly flat (slightly lower at the edges for a real source). $\lambda(x)$: same flat level outside the object's shadow, dipping to a minimum at the center where the chord through the disk is longest. $y(x)$: zero outside the shadow, rising to a maximum at the center with the shape of the chord length $2\sqrt{R^2-x^2}$ scaled by $\mu$.`},
      {q:R`A detector reports $Y_T=0$ for some ray. What goes wrong, and name two practical remedies.`,
       a:R`$-\log(0/Y_0)=+\infty$: the projection is undefined. Remedies: clamp counts to a minimum (e.g. 1), use a statistical (Poisson likelihood) model-based reconstruction that handles zero counts naturally, increase dose or exposure, or interpolate the projection from neighbors (metal-artifact reduction).`},
      {q:R`If the X-ray energy is increased from 40 keV to 80 keV, what happens to the wavelength and, typically, to $\mu$?`,
       a:R`$E=hc/\lambda_w$ so doubling the energy halves the wavelength. For most materials $\mu$ decreases with energy (less photoelectric absorption), e.g. polyethylene drops from about 0.21 to 0.17 cm$^{-1}$, so more photons get through.`}
     ]}
  ]
 },
 {
  id:"plane", name:"2-D plane waves and basic CSFT pairs (wavelength, angle, sketches)", prob:85, trend:"stable",
  years:["2016 P2","2018 P2","2020 P1","2023 P1","2024 P1","2025 P1","2026 P1,P3"],
  evidence: R`Seven of eleven exams, including all of 2023–2026. Asks: the CSFT of $\cos(2\pi(u_0x+v_0y))$ (a pair of impulses), the spatial frequency magnitude $f_0=\sqrt{u_0^2+v_0^2}$, period $1/f_0$, and angle $\phi=\arctan(v_0/u_0)$; sketches of the wave and of its spectrum; the signal along a line through the wave; CSFT of $\delta(x)$, $\mathrm{sinc}(ax)\mathrm{sinc}(by)$, $\mathrm{rect}(at)$, convolution of sincs; modulated sinc (bandwidth and center frequency); Nyquist sampling period for a plane wave.`,
  concepts:[
   R`$g(x,y)=\cos(2\pi(u_0x+v_0y))\;\leftrightarrow\;G(u,v)=\tfrac12[\delta(u-u_0,v-v_0)+\delta(u+u_0,v+v_0)]$. Frequency magnitude $f_0=\sqrt{u_0^2+v_0^2}$, period (peak spacing) $P_0=1/f_0$, direction of propagation $\phi=\arctan(v_0/u_0)$; wavefronts (peaks) are lines perpendicular to $(u_0,v_0)$.`,
   R`Along $y=0$ the wave is $\cos(2\pi u_0x)$ with frequency $u_0\le f_0$ (period stretched by $1/\cos\phi$); along $x=0$ it is $\cos(2\pi v_0y)$.`,
   R`Pairs: $\mathrm{rect}(at)\leftrightarrow\tfrac1{|a|}\mathrm{sinc}(f/a)$, $\mathrm{sinc}(at)\leftrightarrow\tfrac1{|a|}\mathrm{rect}(f/a)$, $\delta(x)$ (a line along $y$) $\leftrightarrow\delta(v)$ (a line along $u$), $\mathrm{sinc}(ax)\mathrm{sinc}(by)\leftrightarrow\tfrac1{ab}\mathrm{rect}(u/a)\mathrm{rect}(v/b)$, $e^{-\pi(x^2+y^2)}\leftrightarrow e^{-\pi(u^2+v^2)}$.`,
   R`Modulation: $g(x,y)\cos(2\pi(u_0x+v_0y))\leftrightarrow\tfrac12[G(u-u_0,v-v_0)+G(u+u_0,v+v_0)]$; for $\mathrm{sinc}(x,y)$ the two boxes have bandwidth 1 and center frequency $f_c=\sqrt{u_0^2+v_0^2}$.`,
   R`$\mathrm{sinc}(at)*\mathrm{sinc}(bt)=\dfrac1{\max(a,b)}\mathrm{sinc}(\min(a,b)t)$ (product of rects is the narrower rect).`,
   R`Rectangular sampling with period $T$ of a plane wave is alias-free iff $T&lt;\dfrac1{2\max(|u_0|,|v_0|)}$; for a modulated wave with bandwidth 1, $T&lt;\dfrac1{2(\max(|u_0|,|v_0|)+\tfrac12)}$.`,
   R`Rotation property: if $f'(x)=f(Rx)$ for a rotation $R$, then $F'(u)=F(Ru)$; general linear map $f(Ax)\leftrightarrow\tfrac1{|\det A|}F(A^{-t}u)$.`
  ],
  problems:[
   { title:"A tilted plane wave and its samples", points:35,
     intro: R`Let $g(x,y)=\sin\big(2\pi(6x-8y)\big)$ with $x,y$ in mm.`,
     parts:[
      {q:R`Compute $G(u,v)$, the CSFT of $g$.`,
       a:R`$\sin\theta=\tfrac1{2j}(e^{j\theta}-e^{-j\theta})$, so $G(u,v)=\dfrac1{2j}\big[\delta(u-6,v+8)-\delta(u+6,v-8)\big]$: two impulses of opposite imaginary weight at $(6,-8)$ and $(-6,8)$ cycles/mm.`},
      {q:R`Find the spatial frequency magnitude $f_0$, the peak spacing $P_0$, and the angle $\phi$ of the wave. Sketch the wave, labeling $P_0$ and $\phi$.`,
       a:R`$f_0=\sqrt{36+64}=10$ cycles/mm, $P_0=0.1$ mm, $\phi=\arctan(-8/6)\approx-53.1^\circ$ (direction of the vector $(6,-8)$). The crests are parallel lines perpendicular to $(6,-8)$, i.e. along the direction $(8,6)$, spaced $0.1$ mm apart.`},
      {q:R`Give the 1-D signals sensed along the $x$-axis ($y=0$) and along the line in the direction $(6,-8)/10$ through the origin, and their frequencies.`,
       a:R`Along $y=0$: $s(x)=\sin(2\pi6x)$, frequency 6 cycles/mm (period $1/6$ mm, longer than $P_0$). Along the unit direction $d=(0.6,-0.8)$, parametrize by arc length $r$: $g(rd)=\sin(2\pi(3.6r+6.4r))=\sin(2\pi\cdot10r)$, frequency $f_0=10$ cycles/mm.`},
      {q:R`What sampling period $T$ (rectangular grid) satisfies the Nyquist condition?`,
       a:R`The spectrum has impulses at $|u|=6$ and $|v|=8$, so both axes need $\tfrac1T>2\cdot8$ in the worst direction: $T&lt;\dfrac1{16}$ mm $=62.5\ \mu$m.`},
      {q:R`With $T=0.1$ mm, describe the DSFT $S(e^{j\mu},e^{j\nu})$ of $s(m,n)=g(mT,nT)$ on $[-\pi,\pi]^2$ and the apparent (aliased) frequency of the sampled wave.`,
       a:R`$S=\tfrac1{T^2}\sum_{k,l}G\big(\tfrac{\mu-2\pi k}{2\pi T},\tfrac{\nu-2\pi l}{2\pi T}\big)$ places impulses at $(\mu,\nu)=(2\pi\cdot0.6,-2\pi\cdot0.8)=(1.2\pi,-1.6\pi)$ and its negative, plus $2\pi$-periodic copies. Folding into $[-\pi,\pi]^2$: $1.2\pi\to-0.8\pi$ and $-1.6\pi\to0.4\pi$. So the samples look like a wave with frequencies $(-4,\,2)$ cycles/mm, i.e. $s(m,n)=\sin(2\pi(-0.4m+0.2n))$: aliasing has changed both the frequency and the orientation.`}
     ]},
   { title:"CSFT starter table and the modulated sinc", points:30,
     intro: R`Give the 2-D CSFT of each function (for $a,b>0$) and sketch the result.`,
     parts:[
      {q:R`$f(x,y)=\mathrm{rect}(x/a)\,\mathrm{rect}(y/b)$`,
       a:R`Separable: $F(u,v)=ab\,\mathrm{sinc}(au)\,\mathrm{sinc}(bv)$; main lobe widths $2/a$ in $u$ and $2/b$ in $v$ (a wide box gives a narrow sinc).`},
      {q:R`$f(x,y)=\delta(x-1,y)+\delta(x+1,y)$`,
       a:R`$F(u,v)=e^{-j2\pi u}+e^{j2\pi u}=2\cos(2\pi u)$, independent of $v$: a corrugation in the $u$ direction with period 1.`},
      {q:R`$f(x,y)=\mathrm{sinc}(ax)$ (no dependence on $y$)`,
       a:R`$\mathrm{sinc}(ax)\cdot1\leftrightarrow\tfrac1a\mathrm{rect}(u/a)\,\delta(v)$: a line segment of impulses along the $u$-axis, length $a$, weight $1/a$.`},
      {q:R`$f(x,y)=\mathrm{sinc}(x,y)\cos\big(2\pi(u_0x+v_0y)\big)$ with $u_0,v_0\gg1$: give $F$, the center frequency $f_c$ and the bandwidth $f_b$, and the minimum rectangular sampling period.`,
       a:R`$F(u,v)=\tfrac12\mathrm{rect}(u-u_0,v-v_0)+\tfrac12\mathrm{rect}(u+u_0,v+v_0)$: two unit boxes centered at $\pm(u_0,v_0)$. $f_c=\sqrt{u_0^2+v_0^2}$, $f_b=1$ (each box is 1 wide). The highest frequency along either axis is $\max(u_0,v_0)+\tfrac12$, so $T&lt;\dfrac1{2(\max(u_0,v_0)+\tfrac12)}$.`},
      {q:R`$s(t)=\mathrm{sinc}(at)*\mathrm{sinc}(bt)$ with $a>b$`,
       a:R`In frequency $\tfrac1a\mathrm{rect}(f/a)\cdot\tfrac1b\mathrm{rect}(f/b)=\tfrac1{ab}\mathrm{rect}(f/b)$, so $s(t)=\tfrac1a\mathrm{sinc}(bt)$: convolving with a wider-band sinc leaves the narrower-band sinc, scaled by $1/a$.`}
     ]}
  ]
 },
 {
  id:"lsi", name:"2-D LSI filters: sharpening (unsharp mask), separability, DSFT, DC gain, 2-D IIR filters", prob:68, trend:"falling",
  years:["2016 P1","2017 P1","2018 P1","2020 P3","2021 P2","2022 P2","2025 P2"],
  evidence: R`Seven of eleven exams; a fixture from 2016 to 2022 and back in 2025 (DSFT of a separable Laplacian-like kernel). The classic problem is $y=x+\lambda(x-h*x)$ with a $3\times3$ box or binomial $h$: compute $H(e^{j\mu},e^{j\nu})$, the overall psf and transfer function, the DC gain (always 1), decide separability (prove non-separability by rank), count multiplies for direct vs. separable implementation, and explain that $\lambda>0$ sharpens and $\lambda&lt;0$ blurs. Alternate: the 2-D IIR recursion $y=\rho y(m-1,n)+\rho y(m,n-1)-\rho^2y(m-1,n-1)+x$: transfer function, separability, impulse response, stability, multiplies per pixel.`,
  concepts:[
   R`DSFT $X(e^{j\mu},e^{j\nu})=\sum_{m,n}x(m,n)e^{-j(\mu m+\nu n)}$, $2\pi$-periodic in both variables. DC gain $H(e^{j0},e^{j0})=\sum_{m,n}h(m,n)$; for image filters one usually wants DC gain 1 so brightness is preserved.`,
   R`Separable $h(m,n)=h_1(m)h_2(n)\Rightarrow H=H_1(e^{j\mu})H_2(e^{j\nu})$ and the 2-D convolution can be done as row then column 1-D convolutions ($p+q$ instead of $pq$ multiplies per pixel). A psf is separable iff its matrix has rank 1 (all rows proportional).`,
   R`Common 1-D pieces: $\tfrac13[1,1,1]\leftrightarrow\tfrac13(1+2\cos\omega)$; $\tfrac14[1,2,1]\leftrightarrow\tfrac12(1+\cos\omega)$; $\delta-\tfrac12[\delta_{n-1}+\delta_{n+1}]\leftrightarrow1-\cos\omega$; $[1,-1]\leftrightarrow1-e^{-j\omega}$.`,
   R`Unsharp mask $y=x+\lambda(x-h*x)$: psf $p=(1+\lambda)\delta-\lambda h$, $P=1+\lambda(1-H)$; $P(0,0)=1$; $P(\pi,\pi)=1+\lambda(1-H(\pi,\pi))$ is the maximum boost. $\lambda>0$ high-frequency emphasis (sharpen), $\lambda&lt;0$ low-pass (blur). $p$ is generally not separable even when $h$ is.`,
   R`2-D IIR $y=ay(m-1,n)+by(m,n-1)-ab\,y(m-1,n-1)+x$: $H(z_1,z_2)=\dfrac1{(1-az_1^{-1})(1-bz_2^{-1})}$, separable, $h=a^mb^nu(m)u(n)$, stable iff $|a|&lt;1,|b|&lt;1$; implement as two 1-D recursions (2 multiplies/pixel instead of 3).`,
   R`Linearity and space invariance checks; the DC gain of a filter built from differences ($\delta-h$ with $\sum h=1$) is 0.`
  ],
  problems:[
   { title:"A plus-shaped smoothing filter and its sharpening companion", points:35,
     intro: R`Let $h(m,n)=\tfrac14\big[\delta(m-1,n)+\delta(m+1,n)+\delta(m,n-1)+\delta(m,n+1)\big]$ (average of the four nearest neighbors, center excluded) and $g(m,n)=\delta(m,n)+\lambda\,[\delta(m,n)-h(m,n)]$.`,
     parts:[
      {q:R`Compute $H(e^{j\mu},e^{j\nu})$ and the DC gain of $h$.`,
       a:R`$H=\tfrac14(e^{-j\mu}+e^{j\mu}+e^{-j\nu}+e^{j\nu})=\tfrac12(\cos\mu+\cos\nu)$; $H(e^{j0},e^{j0})=1$.`},
      {q:R`Is $h$ separable? Prove your answer.`,
       a:R`No. Its $3\times3$ matrix $\tfrac14\begin{bmatrix}0&1&0\\1&0&1\\0&1&0\end{bmatrix}$ has rank 2 (rows 1 and 2 are linearly independent), and a separable psf $h_1(m)h_2(n)$ has rank 1.`},
      {q:R`Find $H$ at $(\pi,\pi)$, $(\pi,0)$ and $(\pi/2,\pi/2)$ and describe the filter's behavior along the diagonal frequency direction.`,
       a:R`$H(\pi,\pi)=-1$, $H(\pi,0)=0$, $H(\pi/2,\pi/2)=0$. Along the diagonal $\mu=\nu$, $H=\cos\mu$ passes through zero at $\pi/2$ and reaches $-1$ at the corner: the checkerboard pattern is inverted, not removed, so $h$ is a poor low-pass compared with the $3\times3$ box or binomial filters (which have $H\ge0$ everywhere or nearly so).`},
      {q:R`Compute $G(e^{j\mu},e^{j\nu})$, its DC gain, and its value at $(\pi,\pi)$ for $\lambda=1$.`,
       a:R`$G=1+\lambda\big(1-\tfrac12(\cos\mu+\cos\nu)\big)$; DC gain $1$; at $(\pi,\pi)$: $1+\lambda(1+1)=1+2\lambda=3$ for $\lambda=1$. Because $H$ goes negative, the sharpening boost at the corner is $1+2\lambda$ rather than the $1+\lambda$ obtained with a non-negative $H$.`},
      {q:R`Write $g$ as a $3\times3$ psf and count multiplies per pixel for (i) direct convolution, (ii) exploiting the symmetry of $h$ (add symmetric neighbors before multiplying).`,
       a:R`$g=\begin{bmatrix}0&-\lambda/4&0\\-\lambda/4&1+\lambda&-\lambda/4\\0&-\lambda/4&0\end{bmatrix}$. (i) 5 nonzero taps: 5 multiplies. (ii) Sum the four neighbors first (3 additions), then one multiply by $-\lambda/4$ and one by $1+\lambda$: 2 multiplies per pixel. Separability is not the only route to efficiency; symmetry helps too.`},
      {q:R`Show that $\delta-h$ is a discrete Laplacian up to scale, and use it to explain what $g$ does for $\lambda>0$ and $\lambda&lt;0$.`,
       a:R`For small frequencies $1-H=1-\tfrac12(\cos\mu+\cos\nu)\approx\tfrac14(\mu^2+\nu^2)$, which is $-\tfrac14$ times the frequency response $-(\mu^2+\nu^2)$ of the Laplacian: $\delta-h=-\tfrac14\nabla^2$ (the standard 5-point Laplacian divided by $-4$). So $g\approx\delta-\tfrac\lambda4\nabla^2$: $\lambda>0$ subtracts the Laplacian, which sharpens edges (unsharp masking); $\lambda&lt;0$ adds it, which blurs.`}
     ]},
   { title:"A non-separable 2-D IIR filter", points:30,
     intro: R`Consider $y(m,n)=a\,y(m-1,n)+b\,y(m,n-1)+x(m,n)$ with real $a,b$.`,
     parts:[
      {q:R`Compute $H(z_1,z_2)$.`,
       a:R`$Y(1-az_1^{-1}-bz_2^{-1})=X$, so $H(z_1,z_2)=\dfrac1{1-az_1^{-1}-bz_2^{-1}}$.`},
      {q:R`Is $H$ separable? Prove your answer.`,
       a:R`No. If $H=H_1(z_1)H_2(z_2)$ then $1/H=(1/H_1)(1/H_2)$ would be a product, but $1-az_1^{-1}-bz_2^{-1}$ has no $z_1^{-1}z_2^{-1}$ term while any product $(\alpha+\beta z_1^{-1})(\gamma+\delta z_2^{-1})$ with both linear factors present has one ($\beta\delta\ne0$). Equivalently, the impulse response below is not rank one.`},
      {q:R`Compute $h(m,n)$ for $m,n\ge0$. (Hint: count lattice paths from $(0,0)$ to $(m,n)$.)`,
       a:R`Expanding $H=\sum_k(az_1^{-1}+bz_2^{-1})^k$ and collecting the term $z_1^{-m}z_2^{-n}$ from $k=m+n$: $h(m,n)=\binom{m+n}{m}a^mb^n$ for $m,n\ge0$, zero otherwise. Each of the $\binom{m+n}m$ monotone paths from the origin contributes $a^mb^n$.`},
      {q:R`Give a sufficient condition for stability and check whether the system is stable for $a=b=0.6$.`,
       a:R`$\sum_{m,n}|h|=\sum_k(|a|+|b|)^k$ converges iff $|a|+|b|&lt;1$. For $a=b=0.6$, $|a|+|b|=1.2$: unstable (the DC gain $1/(1-a-b)$ would be negative, which signals divergence).`},
      {q:R`Compute the DC gain and the frequency response magnitude at $(\mu,\nu)=(\pi,\pi)$ for $a=b=0.4$.`,
       a:R`$H(e^{j\mu},e^{j\nu})=\dfrac1{1-ae^{-j\mu}-be^{-j\nu}}$. DC: $\dfrac1{1-0.8}=5$. At $(\pi,\pi)$: $\dfrac1{1+0.8}\approx0.56$. A low-pass with strong DC gain, oriented diagonally (the impulse response spreads along the $m+n$ direction).`},
      {q:R`How many multiplies per pixel does the recursion need, and can the trick used for the separable recursion (two 1-D passes) be applied here?`,
       a:R`Two multiplies per pixel ($a$ and $b$). The two-pass trick requires a separable transfer function; since $H$ is not separable, the 2-D recursion must be run as a single raster-order sweep (though it is still cheap).`}
     ]}
  ]
 },
 {
  id:"sampling", name:"Sampling and reconstruction: Nyquist, DSFT of sampled signals, focal-plane arrays and displays", prob:72, trend:"stable",
  years:["2018 P2","2019 P3","2021 P4","2022 P3","2023 P3","2024 P4"],
  evidence: R`Six of eleven exams. Asks: the DSFT of $s(m,n)=g(mT,nT)$ via $S=\tfrac1{T^2}\sum_{k,l}G\big(\tfrac{\mu-2\pi k}{2\pi T},\tfrac{\nu-2\pi l}{2\pi T}\big)$, the Nyquist period, sketches for specific $T$ (including the aliased case), what $\mathrm{sinc}$ samples look like ($\mathrm{sinc}(n)=\delta(n)$), a detector that integrates over a pixel (convolution with $\tfrac1{T^2}\mathrm{rect}$ then sampling), a display with square pixels (reconstruction with $\mathrm{rect}$), the net $\mathrm{sinc}^2$ roll-off, and the compensating digital filter.`,
  concepts:[
   R`1-D: $y(n)=x(nT)\Rightarrow Y(e^{j\omega})=\tfrac1T\sum_kX\big(\tfrac{\omega-2\pi k}{2\pi T}\big)$; the continuous frequency $f$ maps to $\omega=2\pi fT$. Alias-free iff $X(f)=0$ for $|f|\ge\tfrac1{2T}$ (Nyquist). Reconstruction: $x(t)=\sum_ny(n)\mathrm{sinc}\big(\tfrac{t-nT}{T}\big)$.`,
   R`2-D: $S(e^{j\mu},e^{j\nu})=\tfrac1{T^2}\sum_{k,l}G\big(\tfrac{\mu-2\pi k}{2\pi T},\tfrac{\nu-2\pi l}{2\pi T}\big)$; need $G=0$ outside $|u|,|v|&lt;\tfrac1{2T}$.`,
   R`Sampled sinc: $g(t)=\mathrm{sinc}(t/\tau)$ has $G=\tau\,\mathrm{rect}(\tau f)$, band limit $\tfrac1{2\tau}$, Nyquist $T&lt;\tau$. At $T=\tau$, $s(n)=\mathrm{sinc}(n)=\delta(n)$ and $S=1$ (replicas tile perfectly). At $T>\tau$ the replicas overlap (aliasing) yet $s(n)$ may still be $\delta(n)$ (e.g. $\mathrm{sinc}(2n)$).`,
   R`Detector integration: $s(m,n)=\int\!\!\int g(x,y)\,\tfrac1{T^2}\mathrm{rect}\big(\tfrac{x-mT}{T},\tfrac{y-nT}{T}\big)dxdy$ $=$ (convolve with $\tfrac1{T^2}\mathrm{rect}(x/T,y/T)$, whose CSFT is $\mathrm{sinc}(Tu,Tv)$) then sample: $S=\tfrac1{T^2}\sum\mathrm{sinc}\big(\tfrac{\mu-2\pi k}{2\pi},\tfrac{\nu-2\pi l}{2\pi}\big)G(\cdot)$.`,
   R`Display with pixels $p(x,y)=\mathrm{rect}(x/T,y/T)$: $f(x,y)=\sum s(m,n)p(x-mT,y-nT)\Rightarrow F(u,v)=T^2\mathrm{sinc}(Tu,Tv)\,S(e^{j2\pi Tu},e^{j2\pi Tv})$. Under Nyquist the chain gives $F=\mathrm{sinc}^2(Tu,Tv)G(u,v)$: a mild low-pass (0.405 at the band edge).`,
   R`Compensation filter $H(e^{j\mu},e^{j\nu})=1/\mathrm{sinc}^2\big(\tfrac\mu{2\pi},\tfrac\nu{2\pi}\big)$ on $[-\pi,\pi]^2$; gain 2.47 at the edge, so noise is amplified; often limited.`,
   R`Non-rectangular sampling: $f(x)=\tilde f(Ax)\Rightarrow F(u)=\tfrac1{|\det A|}\tilde F(A^{-t}u)$; sample locations of $s(m,n)=f(Tm,Tn)$ in the $\tilde f$ plane are $AT(m,n)^t$.`
  ],
  problems:[
   { title:"Sampling an anisotropic sinc", points:35,
     intro: R`Let $g(x,y)=\mathrm{sinc}(2x)\,\mathrm{sinc}(y)$ and $s(m,n)=g(mT,nT)$.`,
     parts:[
      {q:R`Compute $G(u,v)$ and sketch its support.`,
       a:R`$G(u,v)=\tfrac12\mathrm{rect}(u/2)\,\mathrm{rect}(v)$: a box of height $\tfrac12$ covering $|u|&lt;1$, $|v|&lt;\tfrac12$.`},
      {q:R`What are the band limits in $u$ and $v$, and the largest $T$ (same in both directions) that avoids aliasing?`,
       a:R`Band limits $1$ cycle/unit in $u$ and $\tfrac12$ in $v$. Need $\tfrac1{2T}>1$, so $T&lt;\tfrac12$ (the $x$ direction is the bottleneck).`},
      {q:R`Write $S(e^{j\mu},e^{j\nu})$ for $T=\tfrac14$ and sketch it on $[-2\pi,2\pi]^2$.`,
       a:R`$S=\tfrac1{T^2}\sum_{k,l}\tfrac12\mathrm{rect}\big(\tfrac{\mu-2\pi k}{4\pi T}\big)\mathrm{rect}\big(\tfrac{\nu-2\pi l}{2\pi T}\big)=8\sum_{k,l}\mathrm{rect}\big(\tfrac{\mu-2\pi k}{\pi}\big)\mathrm{rect}\big(\tfrac{\nu-2\pi l}{\pi/2}\big)$: boxes of height 8, width $\pi$ in $\mu$ and $\pi/2$ in $\nu$, centered on the $2\pi$ lattice, with gaps (no aliasing).`},
      {q:R`Now take $T=1$. Compute $s(m,n)$ directly and explain what the DSFT looks like.`,
       a:R`$s(m,n)=\mathrm{sinc}(2m)\mathrm{sinc}(n)=\delta(m)\delta(n)$ since both sincs vanish at nonzero integers. Hence $S\equiv1$. In the replica picture, the $u$-boxes of width 2 spaced by 1 overlap so every point is covered by exactly two replicas each of height $\tfrac12$, summing to 1: severe aliasing has flattened the spectrum, and the samples cannot distinguish $g$ from $\mathrm{sinc}(x,y)$.`},
      {q:R`For $T=\tfrac14$ write the reconstruction formula that recovers $g$ from $s$.`,
       a:R`$g(x,y)=\sum_{m,n}s(m,n)\,\mathrm{sinc}\Big(\dfrac{x-mT}{T}\Big)\mathrm{sinc}\Big(\dfrac{y-nT}{T}\Big)$ with $T=\tfrac14$ (ideal low-pass interpolation with cutoff $\tfrac1{2T}=2$ in each direction).`}
     ]},
   { title:"Camera to display chain with fill factor", points:30,
     intro: R`A focal-plane array has square detectors of side $aT$ ($0&lt;a\le1$) spaced by $T$: $s(m,n)=\dfrac1{(aT)^2}\displaystyle\int\!\!\int g(x,y)\,\mathrm{rect}\Big(\dfrac{x-mT}{aT},\dfrac{y-nT}{aT}\Big)dxdy$. The image is displayed as $f(x,y)=\sum_{m,n}\tilde s(m,n)\,\mathrm{rect}\big(\tfrac{x-mT}{T},\tfrac{y-nT}{T}\big)$ where $\tilde s=h*s$ for a digital filter $H(e^{j\mu},e^{j\nu})$.`,
     parts:[
      {q:R`Model the detector as a filter followed by ideal sampling: give the equivalent psf and its CSFT.`,
       a:R`$s(m,n)=\tilde g(mT,nT)$ with $\tilde g=g*h_d$, $h_d(x,y)=\tfrac1{(aT)^2}\mathrm{rect}\big(\tfrac x{aT},\tfrac y{aT}\big)$ and $H_d(u,v)=\mathrm{sinc}(aTu,aTv)$ (unit DC gain).`},
      {q:R`Write $S(e^{j\mu},e^{j\nu})$ in terms of $G$.`,
       a:R`$S=\dfrac1{T^2}\sum_{k,l}\mathrm{sinc}\Big(a\dfrac{\mu-2\pi k}{2\pi},a\dfrac{\nu-2\pi l}{2\pi}\Big)G\Big(\dfrac{\mu-2\pi k}{2\pi T},\dfrac{\nu-2\pi l}{2\pi T}\Big)$.`},
      {q:R`Assuming $g$ is band-limited to $|u|,|v|&lt;\tfrac1{2T}$, derive $F(u,v)$ in terms of $G(u,v)$.`,
       a:R`Only the $k=l=0$ term contributes inside the band. $F(u,v)=T^2\mathrm{sinc}(Tu,Tv)\,\tilde S(e^{j2\pi Tu},e^{j2\pi Tv})$ and $\tilde S=HS$, so $$F(u,v)=\mathrm{sinc}(Tu,Tv)\,\mathrm{sinc}(aTu,aTv)\,H(e^{j2\pi Tu},e^{j2\pi Tv})\,G(u,v).$$`},
      {q:R`Specify $H$ that makes $F=G$ in the band, and evaluate the required gain at the band edge $u=\tfrac1{2T}$ for $a=1$ and for $a=\tfrac12$.`,
       a:R`$H(e^{j\mu},e^{j\nu})=\dfrac1{\mathrm{sinc}(\tfrac\mu{2\pi})\mathrm{sinc}(\tfrac{a\mu}{2\pi})\mathrm{sinc}(\tfrac\nu{2\pi})\mathrm{sinc}(\tfrac{a\nu}{2\pi})}$ for $|\mu|,|\nu|&lt;\pi$. Along $\nu=0$ at $\mu=\pi$: $\mathrm{sinc}(\tfrac12)=0.637$; for $a=1$ the gain is $1/0.637^2=2.47$; for $a=\tfrac12$, $\mathrm{sinc}(\tfrac14)=0.900$ and the gain is $1/(0.637\cdot0.900)=1.74$. Smaller detectors blur less, so less boost (and less noise amplification) is needed.`},
      {q:R`What is the trade-off in choosing $a$ small?`,
       a:R`Small $a$ means sharper sampling (less pre-blur) but each detector collects less light, so the signal-to-noise ratio drops. Large $a$ (fill factor near 1) collects more light and also acts as an anti-aliasing filter, at the cost of $\mathrm{sinc}$ roll-off that must be compensated.`}
     ]}
  ]
 },
 {
  id:"radon", name:"Forward projection (Radon transform) and the Fourier slice theorem", prob:42, trend:"stable",
  years:["2018 P3","2019 P2","2024 P2"],
  evidence: R`Three of eleven Exam 1s (and 2022/2023 finals). Asks: the definition $p_\theta(r)=\int f(r\cos\theta-z\sin\theta,\;r\sin\theta+z\cos\theta)dz$, the Fourier slice theorem $P_\theta(\rho)=F(\rho\cos\theta,\rho\sin\theta)$, the shift property, and explicit projections of a Gaussian, a unit disk ($2\sqrt{1-r^2}$), and shifted versions, with sketches at several $\theta$.`,
  concepts:[
   R`$p_\theta(r)=\int_{-\infty}^\infty f(r\cos\theta-z\sin\theta,\,r\sin\theta+z\cos\theta)\,dz$: line integral along the line at distance $r$ from the origin, perpendicular to direction $\theta$.`,
   R`Fourier slice theorem: $P_\theta(\rho)=\int p_\theta(r)e^{-j2\pi\rho r}dr=F(\rho\cos\theta,\rho\sin\theta)$; the 1-D CTFT of a projection is a radial slice of the 2-D CSFT. Hence projections of a band-limited image are band-limited to the same $f_c$.`,
   R`Shift: $f(x-x_0,y-y_0)\to p_\theta(r-x_0\cos\theta-y_0\sin\theta)$; a point source traces a sinusoid in the sinogram $(r,\theta)$.`,
   R`Unit disk: $p_\theta(r)=2\sqrt{1-r^2}\,\mathrm{rect}(r/2)$, independent of $\theta$. Gaussian $e^{-(x^2+y^2)/2}$: $p_\theta(r)=\sqrt{2\pi}e^{-r^2/2}$. Delta: $p_\theta(r)=\delta(r)$.`,
   R`Back-projection alone gives $f*\tfrac1{\sqrt{x^2+y^2}}$ (frequency response $1/\rho$); filtered back-projection applies the ramp $|\rho|$ before back-projecting.`
  ],
  problems:[
   { title:"Projections of a square and of a point", points:35,
     intro: R`Let $p_\theta(r)=\mathrm{FP}\{f(x,y)\}$ denote the forward projection and $P_\theta(\rho)$ its CTFT.`,
     parts:[
      {q:R`Compute $p_\theta(r)$ for $f(x,y)=\delta(x-x_0,y-y_0)$ and describe the curve it traces in the $(\theta,r)$ sinogram.`,
       a:R`$p_\theta(r)=\delta(r-x_0\cos\theta-y_0\sin\theta)$: a sinusoid $r=\sqrt{x_0^2+y_0^2}\cos(\theta-\phi_0)$ with $\phi_0=\arctan(y_0/x_0)$.`},
      {q:R`Prove the shift property $\mathrm{FP}\{f(x-x_0,y-y_0)\}=p_\theta(r-x_0\cos\theta-y_0\sin\theta)$.`,
       a:R`Write the rotation as $(x,y)^t=A_\theta(r,z)^t$ with $A_\theta$ orthogonal. Then $f(A_\theta(r,z)^t-(x_0,y_0)^t)=f(A_\theta[(r,z)^t-A_\theta^t(x_0,y_0)^t])$ and $A_\theta^t(x_0,y_0)^t=(x_0\cos\theta+y_0\sin\theta,\;-x_0\sin\theta+y_0\cos\theta)^t$. The $z$ shift disappears in the integral over $z$, leaving $p_\theta(r-x_0\cos\theta-y_0\sin\theta)$.`},
      {q:R`Let $f(x,y)=\mathrm{rect}(x)\mathrm{rect}(y)$. Compute $p_0(r)$ and $p_{\pi/2}(r)$ directly.`,
       a:R`At $\theta=0$ the line is $x=r$: $p_0(r)=\int\mathrm{rect}(r)\mathrm{rect}(z)dz=\mathrm{rect}(r)$. By symmetry $p_{\pi/2}(r)=\mathrm{rect}(r)$.`},
      {q:R`Use the Fourier slice theorem to compute $p_{\pi/4}(r)$ for the same square.`,
       a:R`$F(u,v)=\mathrm{sinc}(u)\mathrm{sinc}(v)$, so $P_{\pi/4}(\rho)=\mathrm{sinc}^2(\rho/\sqrt2)$. Since $\Lambda(t)\leftrightarrow\mathrm{sinc}^2(f)$ and $\Lambda(at)\leftrightarrow\tfrac1a\mathrm{sinc}^2(f/a)$, taking $a=\sqrt2$: $p_{\pi/4}(r)=\sqrt2\,\Lambda(\sqrt2\,r)$, a triangle of height $\sqrt2$ (the diagonal) supported on $|r|&lt;1/\sqrt2$. Check: its area is 1, the area of the square, as it must be for every $\theta$.`},
      {q:R`Prove that if $F(u,v)=0$ for $\sqrt{u^2+v^2}>f_c$ then every projection is band-limited to $f_c$.`,
       a:R`$P_\theta(\rho)=F(\rho\cos\theta,\rho\sin\theta)$ and $\sqrt{(\rho\cos\theta)^2+(\rho\sin\theta)^2}=|\rho|$, so for $|\rho|>f_c$, $P_\theta(\rho)=0$.`}
     ]}
  ]
 },
 {
  id:"mri", name:"Magnetic resonance imaging: precession, phase, k-space and reconstruction", prob:42, trend:"stable",
  years:["2017 P2","2022 P4","2025 P4"],
  evidence: R`Three of eleven Exam 1s (plus finals in 2016, 2019, 2026). The 1-D rod problem: $\omega(x,t)=\gamma(M_0+G(t)x)$, $\phi=\int\omega$, $r(x,t)=a(x)e^{j\phi}dx$, $r(t)=e^{j\omega_0t}A(-k(t))$ with $k(t)=\gamma\int_0^tG$, then how to choose $G(t)$, sample, and reconstruct by inverse DFT. 2025 extended it to 2-D with $G_x,G_y$.`,
  concepts:[
   R`Larmor precession: $\omega(x,t)=\gamma M(x,t)=\gamma(M_0+G(t)x)=\omega_0+\gamma G(t)x$ (rad/s). Phase $\phi(x,t)=\int_0^t\omega(x,\tau)d\tau=\omega_0t+x\,k(t)$ with $k(t)=\gamma\int_0^tG(\tau)d\tau$ (rad/cm): the k-space position.`,
   R`Signal from $[x,x+dx]$: $r(x,t)=a(x)e^{j\phi(x,t)}dx$; total $r(t)=e^{j\omega_0t}\int a(x)e^{jxk(t)}dx=e^{j\omega_0t}A(-k(t))$ where $A(k)=\int a(x)e^{-jkx}dx$ is the CSFT of $a$ in rad/cm (equivalently $A_f(-k/2\pi)$ in cycles/cm).`,
   R`So the MRI signal directly samples the Fourier transform of the object along the trajectory $k(t)$; $G(t)$ controls the velocity through k-space. Demodulate by $e^{-j\omega_0t}$ first.`,
   R`Constant readout gradient $G_0$: $k(t)=\gamma G_0t+k_{\min}$ (a negative pre-phasing lobe puts $k_{\min}&lt;0$ so both halves of k-space are covered). Sampling every $\Delta t$ gives $\Delta k=\gamma G_0\Delta t$; field of view $\mathrm{FOV}=2\pi/\Delta k$ must exceed the object length to avoid aliasing; resolution $\approx2\pi/(2k_{\max})$.`,
   R`Reconstruction: inverse DFT of the k-space samples (with fftshift). 2-D: $\phi=\omega_0t+xk_x(t)+yk_y(t)$, $r(t)=e^{j\omega_0t}A(-k_x(t),-k_y(t))$; phase-encode with $G_y$ blips and read out with $G_x$ to fill a Cartesian grid, then 2-D inverse DFT.`
  ],
  problems:[
   { title:"1-D MRI with pre-phasing and readout gradients", points:35,
     intro: R`A thin rod along $x$ has hydrogen density $a(x)$ supported on $|x|\le L/2$. The field is $M(x,t)=M_0+G(t)x$ with $G(t)=-G_0$ for $0\le t&lt;\tau$ and $G(t)=+G_0$ for $\tau\le t\le\tau+T_{\rm acq}$. All spins are excited at $t=0$ with $\phi(x,0)=0$.`,
     parts:[
      {q:R`Compute $\omega(x,t)$ and $\phi(x,t)$, and identify $k(t)$.`,
       a:R`$\omega(x,t)=\gamma(M_0+G(t)x)$. $\phi(x,t)=\omega_0t+x\gamma\int_0^tG(\tau')d\tau'=\omega_0t+xk(t)$ with $k(t)=-\gamma G_0t$ for $t&lt;\tau$ and $k(t)=\gamma G_0(t-2\tau)$ for $t\ge\tau$. So $k$ runs from $-\gamma G_0\tau$ at $t=\tau$ up through zero at $t=2\tau$.`},
      {q:R`Write $r(x,t)$ and $r(t)$, and express $r(t)$ using $A(k)=\int a(x)e^{-jkx}dx$.`,
       a:R`$r(x,t)=a(x)e^{j\phi(x,t)}dx$ and $r(t)=\int a(x)e^{j\omega_0t+jxk(t)}dx=e^{j\omega_0t}A(-k(t))$. After demodulation, $s(t)=r(t)e^{-j\omega_0t}=A(-k(t))$: the receiver reads the Fourier transform of the rod along the k-space trajectory.`},
      {q:R`Why is the negative lobe needed? What determines $k_{\max}$?`,
       a:R`Without pre-phasing the readout would start at $k=0$ and only cover positive frequencies (half of k-space). The lobe starts the readout at $k_{\min}=-\gamma G_0\tau$; choosing $T_{\rm acq}=2\tau$ makes the coverage symmetric with $k_{\max}=\gamma G_0\tau$. Resolution is roughly $\delta x\approx\pi/k_{\max}$, so longer or stronger gradients give finer resolution.`},
      {q:R`The demodulated signal is sampled every $\Delta t$ during readout. Give the k-space spacing $\Delta k$ and the condition on $\Delta t$ that avoids aliasing of the rod.`,
       a:R`$\Delta k=\gamma G_0\Delta t$. Sampling $A(k)$ with spacing $\Delta k$ makes the reconstructed object periodic with period (field of view) $\mathrm{FOV}=2\pi/\Delta k$. To avoid wrap-around need $\mathrm{FOV}\ge L$, i.e. $\Delta t\le\dfrac{2\pi}{\gamma G_0L}$.`},
      {q:R`Describe the reconstruction of $a(x)$ from the samples in words and pseudo-code.`,
       a:R`The $N$ samples $B(n)=A(-(k_{\min}+n\Delta k))$ are uniformly spaced Fourier samples; reverse their order (or conjugate appropriately), fftshift so that $k=0$ is at the center index, take the inverse FFT, and fftshift again: <pre>B &larr; fftshift(B); b &larr; ifft(B); b &larr; fftshift(b)</pre> giving $a(x_n)\approx b(n)$ on the grid $x_n=n\cdot\mathrm{FOV}/N$.`}
     ]},
   { title:"2-D Cartesian k-space", points:25,
     intro: R`A sheet in the $(x,y)$ plane has density $a(x,y)$ and $M(x,y,t)=M_0+xG_x(t)+yG_y(t)$.`,
     parts:[
      {q:R`Give $\omega(x,y,t)$, $\phi(x,y,t)$, and the k-space coordinates $k_x(t),k_y(t)$.`,
       a:R`$\omega=\omega_0+\gamma xG_x(t)+\gamma yG_y(t)$; $\phi=\omega_0t+xk_x(t)+yk_y(t)$ with $k_x(t)=\gamma\int_0^tG_x$, $k_y(t)=\gamma\int_0^tG_y$.`},
      {q:R`Show that the demodulated total signal is a sample of the 2-D CSFT of $a$.`,
       a:R`$r(t)=\int\!\!\int a(x,y)e^{j\omega_0t}e^{j(xk_x+yk_y)}dxdy=e^{j\omega_0t}A(-k_x(t),-k_y(t))$ with $A(\mu,\nu)=\int\!\!\int a\,e^{-j(\mu x+\nu y)}dxdy$.`},
      {q:R`Describe a gradient sequence that fills a Cartesian grid in k-space.`,
       a:R`For each of $N_y$ repetitions: apply a short $G_y$ blip of area proportional to the desired row index (phase encoding, sets $k_y$), a negative $G_x$ pre-phase lobe, then a constant $G_x$ readout while sampling $N_x$ points (traverses $k_x$ from $-k_{x,\max}$ to $+k_{x,\max}$). Repeating for all $k_y$ rows fills the grid.`},
      {q:R`How is $a(x,y)$ reconstructed, and what sets the field of view and resolution in $y$?`,
       a:R`Arrange the samples on the grid and take a 2-D inverse DFT (with fftshifts). $\mathrm{FOV}_y=2\pi/\Delta k_y$ is set by the phase-encoding step, and resolution $\delta y\approx\pi/k_{y,\max}$ by the largest phase-encoding area; more rows means longer scan time.`}
     ]}
  ]
 },
 {
  id:"dsft", name:"DSFT properties: row/column DTFTs, projections and the projection-slice idea", prob:35, trend:"rising",
  years:["2016 P3","2021 P3","2026 P2"],
  evidence: R`Three of eleven, most recently 2026: prove that the DSFT is the column DTFT of the row DTFT, that the horizontal projection $p(m)=\sum_ng(m,n)$ has DTFT $G(\mu,0)$, that $\sum_np_v(n)=X(0,0)$, and decide whether two projections determine the image (no; give a $3\times3$ counterexample).`,
  concepts:[
   R`$G(\mu,\nu)=\sum_m\sum_ng(m,n)e^{-j(\mu m+\nu n)}$; separable sums: DSFT $=$ DTFT along $n$ (rows) followed by DTFT along $m$ (columns), in either order.`,
   R`Zero frequency of a row DTFT is the row sum: $R(m,0)=\sum_ng(m,n)=p(m)$; therefore $P(\mu)=G(\mu,0)$ and $\sum_mp(m)=G(0,0)$ (total mass).`,
   R`Discrete projection-slice theorem: projections along the axes give the two axis slices of the DSFT; they do not determine $G$ off the axes, so two projections cannot reconstruct $g$ (counterexample: two different $3\times3$ arrays with equal row and column sums).`,
   R`DSFT of $a^mb^nu(m)u(n)$ is $\dfrac1{(1-ae^{-j\mu})(1-be^{-j\nu})}$; shift by $(m_0,n_0)$ multiplies by $e^{-j(\mu m_0+\nu n_0)}$.`
  ],
  problems:[
   { title:"Row DTFTs, projections and reconstruction", points:30,
     intro: R`Let $g(m,n)$ be a 2-D discrete-space signal with DSFT $G(\mu,\nu)$, row DTFT $R(m,\nu)=\sum_ng(m,n)e^{-j\nu n}$, and projections $p_h(m)=\sum_ng(m,n)$, $p_v(n)=\sum_mg(m,n)$.`,
     parts:[
      {q:R`Prove $G(\mu,\nu)=\sum_mR(m,\nu)e^{-j\mu m}$.`,
       a:R`$\sum_mR(m,\nu)e^{-j\mu m}=\sum_m\Big[\sum_ng(m,n)e^{-j\nu n}\Big]e^{-j\mu m}=\sum_m\sum_ng(m,n)e^{-j(\mu m+\nu n)}=G(\mu,\nu)$.`},
      {q:R`Show $p_h(m)=R(m,0)$ and $P_h(\mu)=G(\mu,0)$; interpret.`,
       a:R`$R(m,0)=\sum_ng(m,n)e^{0}=p_h(m)$; then $P_h(\mu)=\sum_mp_h(m)e^{-j\mu m}=\sum_mR(m,0)e^{-j\mu m}=G(\mu,0)$. The DTFT of the horizontal projection is the $\nu=0$ slice of the 2-D spectrum (discrete Fourier slice theorem).`},
      {q:R`Show $\sum_np_v(n)=\sum_mp_h(m)=G(0,0)$.`,
       a:R`Both equal $\sum_m\sum_ng(m,n)=G(0,0)$, the DC value.`},
      {q:R`Do $p_h$ and $p_v$ together determine $g$? Prove or give a counterexample.`,
       a:R`No. The two arrays $\begin{bmatrix}1&0\\0&1\end{bmatrix}$ and $\begin{bmatrix}0&1\\1&0\end{bmatrix}$ have identical row sums $(1,1)$ and column sums $(1,1)$ but are different. In frequency terms the projections fix $G$ only on the two axes.`},
      {q:R`Compute the DSFT of $g(m,n)=a^mb^nu(m)u(n)$ for $|a|,|b|&lt;1$ and its horizontal projection $p_h(m)$.`,
       a:R`$G(\mu,\nu)=\dfrac1{(1-ae^{-j\mu})(1-be^{-j\nu})}$. $p_h(m)=a^mu(m)\sum_{n\ge0}b^n=\dfrac{a^mu(m)}{1-b}$, consistent with $P_h(\mu)=G(\mu,0)=\dfrac1{(1-ae^{-j\mu})(1-b)}$.`}
     ]}
  ]
 },
 {
  id:"dtlti", name:"1-D discrete-time LTI systems, z-transforms, ROC and stability", prob:25, trend:"stable",
  years:["2019 P1","2024 P3"],
  evidence: R`Two of eleven: cascaded first-order recursions (impulse responses, transfer functions, magnitude sketches at $a=0.9$) in 2019 and the z-transform of $a^nu(n)$ with ROC and the pole criterion for stability in 2024. Quick review material from the prerequisite course, but it costs points if rusty.`,
  concepts:[
   R`$y(n)=x(n)+ay(n-1)\Rightarrow H(z)=\dfrac1{1-az^{-1}}$, $h(n)=a^nu(n)$, ROC $|z|>|a|$; causal and stable iff $|a|&lt;1$ (poles inside the unit circle; ROC includes the unit circle).`,
   R`$|H(e^{j\omega})|=\dfrac1{\sqrt{1+a^2-2a\cos\omega}}$: low-pass for $a>0$ (peak $\tfrac1{1-a}$ at DC), high-pass for $a&lt;0$.`,
   R`Cascade: $H_3=H_1H_2$, $h_3=h_1*h_2$; $(1-az^{-1})$ in the numerator cancels the pole (inverse system). $(n+1)a^nu(n)\leftrightarrow\dfrac1{(1-ae^{-j\omega})^2}$.`,
   R`FIR difference $[1,-1]$: $H=1-e^{-j\omega}$, $|H|=2|\sin(\omega/2)|$, zero DC gain.`
  ],
  problems:[
   { title:"A pole–zero cascade", points:30,
     intro: R`Let $S_1$: $y(n)=x(n)+ay(n-1)$ and $S_2$: $z(n)=y(n)-y(n-1)$, with $|a|&lt;1$, and $S_3=S_2\circ S_1$.`,
     parts:[
      {q:R`Give $h_1(n)$, $H_1(z)$ with its ROC, and state whether $S_1$ is stable.`,
       a:R`$h_1(n)=a^nu(n)$, $H_1(z)=\dfrac1{1-az^{-1}}$, ROC $|z|>|a|$, which contains the unit circle since $|a|&lt;1$: stable.`},
      {q:R`Give $h_2(n)$, $H_2(z)$ and sketch $|H_2(e^{j\omega})|$.`,
       a:R`$h_2(n)=\delta(n)-\delta(n-1)$, $H_2(z)=1-z^{-1}$, $|H_2(e^{j\omega})|=|1-e^{-j\omega}|=2|\sin(\omega/2)|$: zero at DC, maximum 2 at $\omega=\pm\pi$ (a high-pass differencer).`},
      {q:R`Find $H_3(z)$ and $h_3(n)$ in simplified form.`,
       a:R`$H_3(z)=\dfrac{1-z^{-1}}{1-az^{-1}}$. Partial fractions: $H_3=\dfrac1{1-az^{-1}}-\dfrac{z^{-1}}{1-az^{-1}}$, so $h_3(n)=a^nu(n)-a^{n-1}u(n-1)=\delta(n)-(1-a)a^{n-1}u(n-1)$.`},
      {q:R`Sketch $|H_3(e^{j\omega})|$ for $a=0.9$, giving the values at $\omega=0$ and $\omega=\pi$.`,
       a:R`$|H_3|=\dfrac{2|\sin(\omega/2)|}{\sqrt{1+a^2-2a\cos\omega}}$. At $\omega=0$: 0. At $\omega=\pi$: $\dfrac2{1+a}=\dfrac2{1.9}\approx1.05$. It rises steeply from 0 near DC (the pole at 0.9 boosts low frequencies, fighting the zero at DC) and is roughly flat near 1 for most of the band: a DC-blocking filter.`},
      {q:R`For which $a$ does the ROC of $H_3$ include the unit circle? What is the general rule for causal rational systems?`,
       a:R`For $|a|&lt;1$. General rule: a causal system with rational $H(z)$ is stable iff all poles lie strictly inside the unit circle (equivalently the ROC $|z|>\max|\text{pole}|$ contains $|z|=1$).`}
     ]}
  ]
 }
 ]
};
})();
