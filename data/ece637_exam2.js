window.EXAMDB = window.EXAMDB || {};
(function(){
const R = String.raw;
const C = window.EXAMDB.ece637 = window.EXAMDB.ece637 || {id:"ece637", code:"ECE 63700 (ECE 637)", title:"Digital Image Processing I", exams:{}};
C.exams.exam2 = {
 id:"exam2", name:"Exam 2", years:"Spring 2016 – Spring 2026 (11 exams)",
 format:"3–5 problems, 50 min, closed book with fact sheet",
 mockCount:4, mockTime:"50 minutes",
 notes: R`<b>What the last eleven Exam 2s look like.</b> Exam 2 is about random processes and color. Colorimetry appears in 10 of 11 exams (chromaticity-diagram drawing, XYZ vs. RGB color matching functions, the primaries-to-XYZ matrix from chromaticities and a white point, which colors are real / displayable / need negative primaries). Eigen/SVD analysis of a data matrix and the multivariate Gaussian (contour sketches, whitening, generating samples) appears in 9 of 11. Since 2023 every exam has a white-noise-driven random process problem (autocorrelation, power spectrum, AR filter, prediction errors). Gamma correction, edge detection and the ideal low-pass filter are the occasional third problems.`,
 categories:[
 {
  id:"color", name:"Colorimetry: chromaticity diagram, color matching functions, XYZ vs RGB, primaries-to-XYZ matrix", prob:95, trend:"stable",
  years:["2016 P3","2017 P1","2018 P1","2019 P3","2020 Q4","2022 P5","2023 P2","2024 P5","2025 P3","2026 P3–P4"],
  evidence: R`Ten of eleven Exam 2s, often two problems. Recurring asks: on the chromaticity diagram, shade the region of real colors with $r&lt;0$ (outside the 709 triangle beyond the GB edge), locate the X, Y, Z primaries (imaginary points outside the horseshoe) and their triangle, argue that all real colors have positive XYZ but not all positive XYZ are real; build $M$ from primary chromaticities and a white point via $M=A\,\mathrm{diag}(\alpha)$; explain why display CMFs must have negative lobes while camera sensitivities must be non-negative; classify marked points as real/displayable with the signs of $(r,g,b)$; gamma and equal-energy white.`,
  concepts:[
   R`Tristimulus values are linear in the spectrum: $[X,Y,Z]^t=M_{xyz}I$ with rows equal to the XYZ color matching functions $\bar x,\bar y,\bar z\ge0$ (31 samples, 400–700 nm in 10 nm steps). Chromaticity $x=X/(X+Y+Z)$, $y=Y/(X+Y+Z)$, $z=1-x-y$.`,
   R`Horseshoe (spectral locus) = chromaticities of pure wavelengths; the straight purple line closes it. Every real color lies inside. Equal-energy white is at $(\tfrac13,\tfrac13)$; D65 at about $(0.313,0.329)$.`,
   R`Additive mixtures of two colors lie on the segment between them; the gamut of three primaries is the triangle with vertices at their chromaticities. Colors outside the triangle need a negative amount of some primary (cannot be displayed).`,
   R`X, Y, Z primaries are imaginary (chromaticities $(1,0)$, $(0,1)$, $(0,0)$, outside the horseshoe). Their triangle contains the whole horseshoe, so all real colors have $X,Y,Z\ge0$; but points inside the triangle yet outside the horseshoe are positive XYZ that are not real colors.`,
   R`From primary chromaticities $(x_r,y_r),(x_g,y_g),(x_b,y_b)$ and white $(x_w,y_w)$: $A=\begin{bmatrix}x_r&x_g&x_b\\y_r&y_g&y_b\\z_r&z_g&z_b\end{bmatrix}$, solve $A\alpha=\tfrac1{y_w}[x_w,y_w,z_w]^t$ (so that $r=g=b=1$ gives the white with $Y=1$), then $M=A\,\mathrm{diag}(\alpha_1,\alpha_2,\alpha_3)$ and $[X,Y,Z]^t=M[r,g,b]^t$. Entries of $M$ are positive (columns are XYZ of real primaries); entries of $M^{-1}$ are not (columns are rgb of the imaginary XYZ primaries).`,
   R`Color matching functions for real primaries ($M^{-1}M_{xyz}$ rows) must go negative because spectral colors lie outside any real triangle; camera sensitivities are photon counts and cannot be negative, so a camera measures a positive basis (e.g. approximately XYZ) and a $3\times3$ matrix maps it to display rgb. A display needs real primaries, so it uses rgb, not XYZ.`,
   R`Gamma: displays map $I=I_0(v/255)^\gamma$; store gamma-corrected $v=255(I/I_0)^{1/\gamma}$ in 8 bits (perceptually uniform, no contouring in the dark). Equal-energy white has flat spectrum; D65 differs, so $(255,255,255)$ on a D65 display is not equal-energy white.`
  ],
  problems:[
   { title:"Mixing colors and testing displayability on the chromaticity diagram", points:35,
     intro: R`A display has primaries with chromaticities $R(0.64,0.33)$, $G(0.30,0.60)$, $B(0.15,0.06)$ and $[X,Y,Z]^t=M[r,g,b]^t$ with white $(1,1,1)\mapsto Y=1$. Two colors have tristimulus values $C_1=(X,Y,Z)=(0.30,0.20,0.10)$ and $C_2=(0.10,0.20,0.50)$.`,
     parts:[
      {q:R`Compute the chromaticities of $C_1$ and $C_2$.`,
       a:R`$C_1$: $X+Y+Z=0.6$, $(x,y)=(0.5,0.333)$ (an orange-red). $C_2$: sum $0.8$, $(x,y)=(0.125,0.25)$ (a blue).`},
      {q:R`Compute the chromaticity of the additive mixture $C_1+C_2$ and show it lies on the segment between the two chromaticities. Where on the segment?`,
       a:R`Sum $(0.40,0.40,0.60)$, total $1.4$, $(x,y)=(0.286,0.286)$. Chromaticities mix with weights proportional to $X+Y+Z$: $\tfrac{0.6}{1.4}(0.5,0.333)+\tfrac{0.8}{1.4}(0.125,0.25)=(0.286,0.286)$. So the mixture sits on the segment, closer to $C_2$ because $C_2$ has the larger tristimulus sum, not because it has larger luminance $Y$.`},
      {q:R`A test color has chromaticity $(0.10,0.30)$. Decide whether it can be displayed, using the signs of the primary amounts. (Hint: the line through $G$ and $B$ is $y\approx3.6x+0.06\cdot\!$ ... find it yourself.)`,
       a:R`The GB edge passes through $(0.30,0.60)$ and $(0.15,0.06)$: slope $\tfrac{0.54}{0.15}=3.6$, so the line is $y=3.6x-0.48$. At $x=0.10$ the edge is at $y=-0.12$, and the test point $y=0.30$ lies above/left of it, on the opposite side from $R(0.64,0.33)$ (for which $y-3.6x+0.48=-1.49&lt;0$; for the test point it is $+0.42>0$). Hence $r&lt;0$: the color is outside the gamut and cannot be displayed, although it is a real color (inside the horseshoe, a saturated cyan).`},
      {q:R`Write $M$ as $A\,\mathrm{diag}(\alpha)$, give $A$, and explain how $\alpha$ is found from the white point $(x_w,y_w)$.`,
       a:R`$A=\begin{bmatrix}0.64&0.30&0.15\\0.33&0.60&0.06\\0.03&0.10&0.79\end{bmatrix}$ (columns $(x,y,1-x-y)$ of each primary). $\alpha=\tfrac1{y_w}A^{-1}[x_w,y_w,1-x_w-y_w]^t$ so that $M[1,1,1]^t$ is the white with $Y=1$.`},
      {q:R`Which of the following are guaranteed positive: entries of $M$; entries of $M^{-1}$; $Y$ of any displayable color; $r,g,b$ of the equal-energy white? Justify each.`,
       a:R`$M$: positive (XYZ of real primaries). $M^{-1}$: not (rgb of the imaginary XYZ primaries). $Y$ of a displayable color: positive, since it is a positive combination of the primaries' positive luminances. $r,g,b$ of equal-energy white $(\tfrac13,\tfrac13)$: positive only if $(\tfrac13,\tfrac13)$ lies inside the RGB triangle, which it does for these primaries (it is near D65), so yes here, but not guaranteed in general.`},
      {q:R`Sketch the diagram with the triangle, the two colors, their mixture and the test point; shade the region of real colors with $b&lt;0$.`,
       a:R`Triangle with vertices R, G, B; $C_1$ inside near the R–G edge, $C_2$ inside near B, mixture on the segment between them, test point outside past the G–B edge. Real colors with $b&lt;0$ are those in the horseshoe beyond the R–G edge (the yellow-green spectral colors between about 520 and 600 nm), since crossing the RG line changes the sign of the B coordinate.`}
     ]},
   { title:"Cameras, displays and color matching functions", points:30,
     intro: R`Let $I\in\mathbb R^{31}$ be a light spectrum, $[X,Y,Z]^t=T_2I$ the XYZ tristimulus, and $[r,g,b]^t=T_1I$ the tristimulus for a display with real SMPTE 709 primaries. A camera has three pixel types with spectral sensitivities forming the rows of $C\in\mathbb R^{3\times31}$.`,
     parts:[
      {q:R`Name the rows of $T_1$ and $T_2$ and list two properties of each.`,
       a:R`Rows of $T_2$: the XYZ color matching functions $\bar x,\bar y,\bar z$; non-negative, and each row is scaled so that equal-energy white gives $X=Y=Z$ (rows sum to the same constant; $\bar y$ is the luminous efficiency). Rows of $T_1$: the rgb color matching functions for the 709 primaries; each takes negative values at some wavelengths, and they sum so that white maps to $r=g=b$.`},
      {q:R`Prove that the rows of $T_1$ cannot all be non-negative.`,
       a:R`Take a spectral line at 500 nm (a pure cyan-green). Its chromaticity lies on the horseshoe outside the 709 triangle (beyond the GB edge), so matching it requires $r&lt;0$: the $r$ row of $T_1$ evaluated at 500 nm is negative. Since this happens for spectral colors outside any real triangle, some CMF must be negative somewhere.`},
      {q:R`Two spectra $I_1\ne I_2$ satisfy $T_2I_1=T_2I_2$. What are they called, and will a display driven by $T_1I_1$ and $T_1I_2$ show the same color?`,
       a:R`Metamers. Since $T_1=BT_2$ for a $3\times3$ $B$ (both are linear color spaces derived from the same cone responses), $T_1I_1=T_1I_2$: yes, the same displayed color. Metamerism is what makes three-primary reproduction possible at all.`},
      {q:R`Why must the rows of $C$ be non-negative, and under what condition on $C$ does a matrix $B$ with $T_1=BC$ exist (exact color reproduction)?`,
       a:R`A pixel's response counts absorbed photons weighted by a quantum efficiency in $[0,1]$, so it cannot decrease when light is added. Exact reproduction needs the rows of $C$ to span the same 3-D subspace as the rows of $T_2$ ($C=QT_2$ with $Q$ invertible, the Luther condition); then $B=T_1T_2^{+}Q^{-1}$. If not, some metamers for the eye are not metamers for the camera and errors are unavoidable.`},
      {q:R`Which color system would you build into a camera and which into a display? Why?`,
       a:R`Camera: XYZ (or any positive linear combination of it), because its CMFs are non-negative and physically realizable as filters. Display: rgb with real primaries, because XYZ primaries are imaginary and cannot be emitted. A $3\times3$ transform connects them.`}
     ]}
  ]
 },
 {
  id:"eigen", name:"Eigen decomposition, SVD, multivariate Gaussian: contours, whitening, generating samples", prob:90, trend:"stable",
  years:["2016 P2","2017 P2","2019 P1","2021 P3","2022 P4","2023 P3","2024 P3","2025 P2","2026 P2"],
  evidence: R`Nine of eleven Exam 2s. Two flavors: (i) data matrix $X=[x_1,\dots,x_n]$ with SVD $X=U\Sigma V^t$: eigenvectors/eigenvalues of $\hat R=\tfrac1nXX^t$ are $U$ and $\Sigma^2/n$; of $\tfrac1pX^tX$ are $V$ and $\Sigma^2/p$; $E[\hat R]=R$; efficient computation when $p\gg n$; (ii) $X\sim N(0,R)$, $R=E\Lambda E^t$: sketch the ellipse (axes $e_k$, semi-axes $\sqrt{\lambda_k}$), decorrelate with $E^t$, whiten with $\Lambda^{-1/2}E^t$, generate samples with $E\Lambda^{1/2}W$, and (2026) do it in two steps: normalize variances, rotate by $45^\circ$, rescale.`,
  concepts:[
   R`Sample covariance $\hat R=\tfrac1n\sum_kx_kx_k^t=\tfrac1nXX^t$ is symmetric positive semidefinite ($a^t\hat Ra=\tfrac1n\|X^ta\|^2\ge0$), $E[\hat R]=R$, rank $\le\min(p,n)$.`,
   R`SVD $X=U\Sigma V^t$ ($U$: $p\times n$ orthonormal columns, $\Sigma$ diagonal decreasing, $V$: $n\times n$ orthonormal): $\hat R=U(\Sigma^2/n)U^t$ so $E=U$, $\Lambda=\Sigma^2/n$; $\tfrac1pX^tX=V(\Sigma^2/p)V^t$. For $p\gg n$ compute the small $n\times n$ matrix $X^tX$, its eigenvectors $V$ and $U=XV\Sigma^{-1}$ (cost $O(pn^2)$ instead of $O(p^2n)$). Columns of $U$ are eigenimages / principal components.`,
   R`$X\sim N(0,R)$: contour $x^tR^{-1}x=1$ is an ellipse with principal axes along the eigenvectors $e_k$ and semi-axis lengths $\sqrt{\lambda_k}$. In 2-D with $E=[\cos\theta,\sin\theta;-\sin\theta,\cos\theta]$ the major axis is at angle $\theta$.`,
   R`Decorrelation $\tilde X=E^tX$: $\mathrm{Cov}(\tilde X)=\Lambda$ (independent for Gaussian). Whitening $W=\Lambda^{-1/2}E^tX\sim N(0,I)$. Synthesis: $X=E\Lambda^{1/2}W$ from i.i.d. $N(0,1)$; $B=R^{-1}=E\Lambda^{-1}E^t$; $Re_k=\lambda_ke_k$.`,
   R`Two-step whitening (2026): $T_1=\mathrm{diag}(1/\sqrt{R_{00}},1/\sqrt{R_{11}})$ gives unit variances with correlation $\rho$ (ellipse at $45^\circ$), $T_2=\tfrac1{\sqrt2}\begin{bmatrix}1&1\\-1&1\end{bmatrix}$ rotates to independent components with variances $1\pm\rho$, $T_3$ rescales them to 1.`,
   R`Direction maximizing $E[(x^tz_\theta)^2]=z_\theta^tRz_\theta$ is the top eigenvector (Rayleigh quotient).`
  ],
  problems:[
   { title:"A 2-D Gaussian: ellipse, whitening, synthesis", points:30,
     intro: R`Let $X\sim N(0,R)$ with $R=\begin{bmatrix}5&3\\3&5\end{bmatrix}$.`,
     parts:[
      {q:R`Compute the eigen decomposition $R=E\Lambda E^t$.`,
       a:R`$\det(R-\lambda I)=(5-\lambda)^2-9=0\Rightarrow\lambda_1=8,\lambda_2=2$. Eigenvectors: $e_1=\tfrac1{\sqrt2}[1,1]^t$ (for 8), $e_2=\tfrac1{\sqrt2}[1,-1]^t$ (for 2). $E=[e_1\;e_2]$, $\Lambda=\mathrm{diag}(8,2)$.`},
      {q:R`Sketch the contour $x^tR^{-1}x=1$, labeling axes and lengths.`,
       a:R`An ellipse centered at the origin with major axis along $[1,1]/\sqrt2$ ($45^\circ$) of semi-length $\sqrt8\approx2.83$ and minor axis along $[1,-1]/\sqrt2$ of semi-length $\sqrt2\approx1.41$.`},
      {q:R`Find the covariance of $\tilde X=E^tX$ and a transformation $W=TX$ with $W\sim N(0,I)$.`,
       a:R`$\mathrm{Cov}(\tilde X)=E^tRE=\Lambda=\mathrm{diag}(8,2)$: uncorrelated, hence independent. $T=\Lambda^{-1/2}E^t=\begin{bmatrix}1/\sqrt{16}&1/\sqrt{16}\\1/2&-1/2\end{bmatrix}=\begin{bmatrix}\tfrac14&\tfrac14\\ \tfrac12&-\tfrac12\end{bmatrix}$; check $TRT^t=I$.`},
      {q:R`Give an algorithm to generate pseudo-random samples of $X$ from i.i.d. $N(0,1)$ numbers.`,
       a:R`Draw $W=[W_1,W_2]^t$ i.i.d. $N(0,1)$ and set $X=E\Lambda^{1/2}W=\tfrac1{\sqrt2}\begin{bmatrix}\sqrt8&\sqrt2\\ \sqrt8&-\sqrt2\end{bmatrix}W=\begin{bmatrix}2W_1+W_2\\2W_1-W_2\end{bmatrix}$. Check: $\mathrm{Var}(X_1)=4+1=5$, $\mathrm{Cov}(X_1,X_2)=4-1=3$.`},
      {q:R`Which unit vector $z_\theta=[\cos\theta,\sin\theta]^t$ maximizes $E[(X^tz_\theta)^2]$, and what is the maximum?`,
       a:R`$E[(X^tz)^2]=z^tRz$ is maximized over unit vectors by the top eigenvector: $\theta=45^\circ$, maximum $\lambda_1=8$. This is the first principal component direction.`}
     ]},
   { title:"PCA compression with eigenimages", points:30,
     intro: R`Let $X=[x_0,\dots,x_{n-1}]\in\mathbb R^{p\times n}$ hold $n$ zero-mean vectorized training images ($p\gg n$) with SVD $X=U\Sigma V^t$, and let $\hat R=\tfrac1nXX^t=E\Lambda E^t$ with eigenvalues in decreasing order.`,
     parts:[
      {q:R`Express $E$ and $\Lambda$ in terms of the SVD and give $\operatorname{rank}(\hat R)$.`,
       a:R`$\hat R=U(\Sigma^2/n)U^t$, so $E=U$ and $\lambda_k=\sigma_k^2/n$; rank $\le n$, so at most $n$ eigenvalues are nonzero.`},
      {q:R`A new image $x$ is approximated by its projection onto the first $k$ eigenimages: $\hat x_k=\sum_{i&lt;k}(e_i^tx)e_i$. How many numbers must be stored per image, and what is the expected squared error $E\|X-\hat X_k\|^2$ if $X\sim N(0,\hat R)$?`,
       a:R`$k$ coefficients (plus the shared eigenimages). $X-\hat X_k=\sum_{i\ge k}(e_i^tX)e_i$ and $E[(e_i^tX)^2]=\lambda_i$, so $E\|X-\hat X_k\|^2=\sum_{i\ge k}\lambda_i$: the sum of the discarded eigenvalues.`},
      {q:R`Show that among all $k$-dimensional subspaces, the span of the top $k$ eigenvectors minimizes the expected squared projection error.`,
       a:R`For an orthonormal basis $\{q_i\}$ of any subspace, the retained energy is $\sum_{i&lt;k}q_i^t\hat Rq_i$, and the Rayleigh-quotient (Ky Fan) inequality bounds this by $\sum_{i&lt;k}\lambda_i$, attained by the top eigenvectors. Maximizing retained energy minimizes the error because total energy $\mathrm{tr}(\hat R)$ is fixed.`},
      {q:R`With $\lambda=(40,20,10,5,2,1,\dots)$ (remaining eigenvalues negligible), how many components keep at least 90% of the energy?`,
       a:R`Total $\approx78$. Cumulative: $40\,(51\%)$, $60\,(77\%)$, $70\,(90\%)$: $k=3$ components.`},
      {q:R`Describe the efficient way to compute $U$ when $p\gg n$ and its cost, and explain why $\hat R$ is a poor estimate of the true covariance $R$ when $n&lt;p$.`,
       a:R`Diagonalize the $n\times n$ matrix $X^tX=V\Sigma^2V^t$ and set $U=XV\Sigma^{-1}$: $O(pn^2+n^3)$ instead of $O(p^2n+p^3)$. $\hat R$ has rank $\le n&lt;p$, so it assigns zero variance to $p-n$ directions that surely have some variance; it is unbiased ($E[\hat R]=R$) but with far too few samples per parameter (about $p^2/2$ parameters from $np$ numbers), and regularization or a low-rank-plus-diagonal model is needed to use it as a prior.`}
     ]}
  ]
 },
 {
  id:"rp", name:"Random processes: autocorrelation, power spectra, AR models and white-noise-driven systems", prob:85, trend:"rising",
  years:["2017 P3","2021 P2","2023 P1","2024 P1–P2","2025 P1","2026 P1"],
  evidence: R`Six of eleven, including all four of 2023–2026. Template: $X_n$ i.i.d. $N(0,\sigma^2)$ through an FIR and/or first-order recursive system: compute $R_x$, $S_x$, impulse responses, frequency responses, $S_y=|H|^2S_x$; or a white-noise-driven AR($p$) process: prediction errors are i.i.d., $S_x=\sigma_w^2/|1-H|^2$, $E[Y_n|Y_{i&lt;n}]=\sum h_kY_{n-k}$, how to synthesize a pseudo-random realization; plus 2024's stationarity and periodogram questions.`,
  concepts:[
   R`WSS: constant mean, $R_x(k)=E[X_nX_{n+k}]$. Power spectrum $S_x(e^{j\omega})=\sum_kR_x(k)e^{-j\omega k}$. White noise: $R_x(k)=\sigma^2\delta(k)$, $S_x=\sigma^2$. i.i.d. is always (strict-sense) stationary; a counterexample of non-stationary $N(0,\sigma^2)$ samples: repeat each value twice.`,
   R`LTI filtering: $S_y=|H(e^{j\omega})|^2S_x$, $R_y=h*h_{-}*R_x$. $h=\delta+\delta_{n-1}$: $|H|^2=2(1+\cos\omega)=4\cos^2(\omega/2)$; $h=\delta-\delta_{n-1}$: $|H|^2=2(1-\cos\omega)$; $h=a^nu(n)$: $|H|^2=\dfrac1{1+a^2-2a\cos\omega}$.`,
   R`AR($p$): $Y_n=W_n+\sum_{k=1}^ph_kY_{n-k}$, $W_n$ i.i.d. $N(0,\sigma_w^2)$. $H(e^{j\omega})=\dfrac1{1-\sum_kh_ke^{-jk\omega}}$, $S_y=\dfrac{\sigma_w^2}{|1-\sum h_ke^{-jk\omega}|^2}$. Causality gives $E[W_n|Y_{i&lt;n}]=0$, so $E[Y_n|Y_{i&lt;n}]=\sum_kh_kY_{n-k}$ and the prediction error is exactly $W_n$: i.i.d., white.`,
   R`Synthesis: filter i.i.d. Gaussian pseudo-random numbers with the IIR recursion. Analysis: least-squares fit $\hat\theta=\hat R^{-1}\hat b$ from data, then whiten. Stability: roots of $z^p-\sum h_kz^{p-k}$ inside the unit circle.`,
   R`2-D separable AR $Y=X+aY(m-1,n)+bY(m,n-1)-abY(m-1,n-1)$: $S_Y=\dfrac{\sigma^2}{|1-ae^{-j\mu}|^2|1-be^{-j\nu}|^2}$, MMSE causal predictor is the recursion without $X$.`,
   R`Periodogram averaging $\hat S=\tfrac1K\sum_k\tfrac1N|X_k(e^{j\omega})|^2$: larger $K$ lowers variance (less noisy), larger $N$ increases frequency resolution (less blurry); need $N\gg1/(\text{feature width})$.`
  ],
  problems:[
   { title:"Differencer followed by a leaky integrator", points:35,
     intro: R`Let $X_n$ be i.i.d. $N(0,\sigma^2)$. System $T_1$: $Y_n=X_n-X_{n-1}$. System $T_2$: $Z_n=\tfrac12Z_{n-1}+Y_n$.`,
     parts:[
      {q:R`Give $R_x(k)$ and $S_x(e^{j\omega})$. Is $X_n$ wide-sense stationary?`,
       a:R`$R_x(k)=\sigma^2\delta(k)$, $S_x=\sigma^2$. Yes: mean 0 and autocorrelation depend only on the lag (i.i.d. is even strict-sense stationary).`},
      {q:R`Find $h_1$, $H_1(e^{j\omega})$ in polar form, and $S_y$.`,
       a:R`$h_1=\delta(n)-\delta(n-1)$, $H_1=1-e^{-j\omega}=e^{-j\omega/2}(e^{j\omega/2}-e^{-j\omega/2})=2j\sin(\omega/2)e^{-j\omega/2}$, so $|H_1|^2=4\sin^2(\omega/2)=2(1-\cos\omega)$ and $S_y=2\sigma^2(1-\cos\omega)$.`},
      {q:R`Compute $R_y(k)$.`,
       a:R`$R_y=\sigma^2\,h_1*h_{1,-}$ $=\sigma^2[2\delta(k)-\delta(k-1)-\delta(k+1)]$, consistent with the inverse DTFT of $2\sigma^2(1-\cos\omega)$.`},
      {q:R`Find $g=h_2$, $G(e^{j\omega})$ and $S_z$ in simplified form.`,
       a:R`$g(n)=(\tfrac12)^nu(n)$, $G=\dfrac1{1-\tfrac12e^{-j\omega}}$, $|G|^2=\dfrac1{1.25-\cos\omega}$. $S_z=\dfrac{2\sigma^2(1-\cos\omega)}{1.25-\cos\omega}$.`},
      {q:R`Evaluate $S_z$ at $\omega=0$ and $\omega=\pi$ and describe the process $Z_n$.`,
       a:R`$S_z(0)=0$ and $S_z(\pi)=\dfrac{4\sigma^2}{2.25}\approx1.78\sigma^2$. $Z$ has no DC content (the differencer kills it) and is high-pass; the leaky integrator only partially undoes the differencing because its pole at 0.5 is far from the zero at 1.`},
      {q:R`Is $Z_n$ an AR process? What is $E[Z_n|Z_{i&lt;n}]$?`,
       a:R`No: the transfer function from $X$ to $Z$ is $\dfrac{1-e^{-j\omega}}{1-\tfrac12e^{-j\omega}}$, which has a zero as well as a pole (ARMA). The MMSE predictor is therefore not simply $\tfrac12Z_{n-1}$; it has infinite memory obtained by inverting the MA part (the innovations are $X_n$, and $E[Z_n|Z_{i&lt;n}]=Z_n-X_n$ requires reconstructing $X_n$ from the past of $Z$).`}
     ]},
   { title:"A second-order white-noise-driven process", points:35,
     intro: R`Let $Y_n=W_n+1.2Y_{n-1}-0.5Y_{n-2}$ where $W_n$ are i.i.d. $N(0,1)$.`,
     parts:[
      {q:R`Is the system from $W$ to $Y$ linear and time invariant? Give $H(e^{j\omega})$ and $S_Y(e^{j\omega})$.`,
       a:R`Yes, it is a constant-coefficient linear recursion. $H(e^{j\omega})=\dfrac1{1-1.2e^{-j\omega}+0.5e^{-2j\omega}}$ and $S_Y=|H|^2\cdot1=\dfrac1{|1-1.2e^{-j\omega}+0.5e^{-2j\omega}|^2}$.`},
      {q:R`Is the process stable/stationary? Check the poles.`,
       a:R`Poles solve $z^2-1.2z+0.5=0$: $z=0.6\pm j\sqrt{0.5-0.36}=0.6\pm j0.374$, $|z|=\sqrt{0.5}\approx0.707&lt;1$. Stable, so a stationary solution exists.`},
      {q:R`Compute $E[W_n|Y_{i&lt;n}]$ and $E[Y_n|Y_{i&lt;n}]$.`,
       a:R`By causality $W_n$ is independent of the past outputs, so $E[W_n|Y_{i&lt;n}]=0$ and $E[Y_n|Y_{i&lt;n}]=1.2Y_{n-1}-0.5Y_{n-2}$.`},
      {q:R`What is the prediction error $Y_n-E[Y_n|Y_{i&lt;n}]$, and what does this say about prediction errors of Gaussian AR processes in general?`,
       a:R`It equals $W_n$: i.i.d. $N(0,1)$. In general, the MMSE prediction errors of a stationary Gaussian process are white (uncorrelated across time); for an AR($p$) process they are exactly the driving noise.`},
      {q:R`You observe $N$ samples of an unknown AR(2) process. Give the least-squares estimate of $(h_1,h_2)$ and $\sigma_w^2$, then explain how to synthesize a new realization.`,
       a:R`With $z_n=[Y_{n-1},Y_{n-2}]$: $\hat R=\tfrac1{N-2}\sum_{n\ge2}z_n^tz_n$, $\hat b=\tfrac1{N-2}\sum_{n\ge2}Y_nz_n^t$, $\hat h=\hat R^{-1}\hat b$, and $\hat\sigma_w^2=\tfrac1{N-2}\sum(Y_n-z_n\hat h)^2$. Synthesis: generate i.i.d. $\tilde W_n\sim N(0,\hat\sigma_w^2)$ and run $\tilde Y_n=\tilde W_n+\hat h_1\tilde Y_{n-1}+\hat h_2\tilde Y_{n-2}$ (discard a transient).`},
      {q:R`To estimate $S_Y$ from $L=NK$ samples by averaging $K$ periodograms of length $N$, what do larger $K$ and larger $N$ buy you? The spectral peak of this process has width about $0.1$ rad; what $N$ is needed?`,
       a:R`Larger $K$ averages more independent estimates and reduces variance (less noisy); larger $N$ gives finer frequency resolution $\approx2\pi/N$ (less blurry). To resolve a 0.1 rad feature need $2\pi/N\ll0.1$, i.e. $N\gg63$, say $N\ge512$.`}
     ]}
  ]
 },
 {
  id:"gamma", name:"Gamma correction, display intensity and 8-bit quantization", prob:38, trend:"stable",
  years:["2017 P1a","2019 P2","2021 P4–P5","2023 P2a–b"],
  evidence: R`Four of eleven. The checkerboard experiment: gray level $g$ has intensity $I_0(g/255)^\gamma$; a fine 0/255 checkerboard averages to $I_0/2$; matching gives $g_0=255\cdot2^{-1/\gamma}$ and $\gamma=\log2/\log(255/g_0)$. Also: which data type stores linear vs. gamma-corrected images (float vs. uint8), and why 8-bit linear storage produces false contours in dark regions.`,
  concepts:[
   R`Display transfer function $I(m,n)=I_0(X/255)^\gamma$ with $\gamma\approx2.2$–$2.4$; the stored value $X$ is "gamma-corrected" $X=255(I/I_0)^{1/\gamma}$ and is roughly perceptually uniform.`,
   R`Viewed from far away, the eye integrates: a 0/255 checkerboard has mean intensity $\tfrac12I_0$; a uniform gray $g$ has $I_0(g/255)^\gamma$. Matching gives $g_0=255(\tfrac12)^{1/\gamma}$ ($\approx186$ for $\gamma=2.2$) and $\gamma=\dfrac{\log2}{\log(255/g_0)}$.`,
   R`Linear-intensity images need floating point (or $\ge12$–16 bits): 8-bit linear quantization has huge relative steps in the dark, giving visible contours/banding. Gamma-corrected images can be stored in 8 bits.`,
   R`Averages in the gamma domain are not averages in energy: mixing 64 and 192 is brighter than uniform 128 in energy; blending, resizing and anti-aliasing should be done in linear light.`
  ],
  problems:[
   { title:"Gamma from two-tone patterns and code allocation", points:30,
     intro: R`A display has $I=I_0(X/255)^\gamma$. Pattern P is a fine checkerboard of the levels $a=64$ and $b=192$; pattern Q is a fine checkerboard of $0$ and $255$; uniform gray $g$ is adjusted to match each pattern when viewed from far away.`,
     parts:[
      {q:R`Write the average intensity of P, of Q, and of the uniform gray $g$.`,
       a:R`$\bar I_P=\tfrac{I_0}2\big[(64/255)^\gamma+(192/255)^\gamma\big]$, $\bar I_Q=\tfrac12I_0$, $\bar I_g=I_0(g/255)^\gamma$.`},
      {q:R`The match to Q occurs at $g_Q=186$. Determine $\gamma$.`,
       a:R`$(186/255)^\gamma=\tfrac12\Rightarrow\gamma=\dfrac{\ln2}{\ln(255/186)}=\dfrac{0.693}{0.316}\approx2.2$.`},
      {q:R`Using $\gamma=2.2$, predict the gray level $g_P$ that matches pattern P.`,
       a:R`$(64/255)^{2.2}\approx0.048$, $(192/255)^{2.2}\approx0.536$, average $0.292$. $g_P=255\cdot0.292^{1/2.2}=255\cdot e^{\ln(0.292)/2.2}=255\cdot e^{-0.559}\approx255\cdot0.572\approx146$. Note $146>128$: the average of two gamma-coded levels is brighter than their code-value midpoint.`},
      {q:R`The eye can distinguish intensity ratios of about 1% (Weber's law). How many distinguishable levels are there between $I_0/1000$ and $I_0$, and how does this compare with 8-bit linear coding of $I$?`,
       a:R`Levels $\approx\ln(1000)/\ln(1.01)\approx6.9/0.00995\approx700$. Linear 8-bit coding of $[0,I_0]$ has step $I_0/255$; near $I_0/1000$ that step is a 25% change, far coarser than 1% (visible contouring), while near $I_0$ it is 0.4% (wasted codes). Gamma (roughly logarithmic) coding equalizes the perceptual step size, which is why 8 bits suffice after gamma correction.`},
      {q:R`A processing pipeline converts the 8-bit gamma-coded image to linear intensity, blurs it, and converts back. In which domain must the blur be done for physically correct results, and what data type should hold the intermediate image?`,
       a:R`Blur (any averaging of light) must be done in the linear-intensity domain, since light adds linearly; the intermediate image should be floating point (or at least 16-bit) to avoid the dark-region contouring of 8-bit linear data, then re-encoded with $X=255(I/I_0)^{1/\gamma}$.`}
     ]}
  ]
 },
 {
  id:"lpf", name:"Ideal discrete-time low-pass filter and DTFT periodicity", prob:22, trend:"stable",
  years:["2016 P1","2022 P2"],
  evidence: R`Two of eleven Exam 2s (and the 2023 final): write $H(\omega)=\mathrm{rect}(\omega/2\omega_c)$ as a $2\pi$-periodic function valid for all $\omega$, sketch it on $[-3\pi,3\pi]$, invert to $h(n)=\tfrac{\omega_c}{\pi}\mathrm{sinc}(\tfrac{\omega_c}{\pi}n)$, sketch for $\omega_c=\pi/2$, and note that $\omega_c=\pi$ gives $\delta(n)$.`,
  concepts:[
   R`$H(\omega)=\sum_k\mathrm{rect}\Big(\dfrac{\omega-2\pi k}{2\omega_c}\Big)$ is the $2\pi$-periodic ideal low-pass; the DTFT of any sequence is $2\pi$-periodic.`,
   R`$h(n)=\tfrac1{2\pi}\int_{-\omega_c}^{\omega_c}e^{j\omega n}d\omega=\dfrac{\sin(\omega_cn)}{\pi n}=\dfrac{\omega_c}{\pi}\mathrm{sinc}\Big(\dfrac{\omega_c}{\pi}n\Big)$; with $\alpha=\omega_c/\pi$: $h=\alpha\,\mathrm{sinc}(\alpha n)$; $\alpha=1$ gives $\delta(n)$ (all-pass).`,
   R`Equivalent view: sampling $T\,\mathrm{sinc}(Tt)\leftrightarrow\mathrm{rect}(f/T)$ at unit rate gives the periodic rect with $\omega_c=\pi T$.`,
   R`Infinite support: must window for real-time use; a rectangular window has the worst sidelobes (Gibbs ripple); tapered windows (Hamming, Kaiser) trade transition width for ripple. Band-pass by modulation $h(n)\cos(\omega_0n)$.`
  ],
  problems:[
   { title:"Ideal low-pass, band-pass and windowing", points:25,
     intro: R`Let $H(\omega)=1$ for $|\omega|\le\alpha\pi$ and $0$ for $\alpha\pi&lt;|\omega|\le\pi$, with $\alpha\in(0,1]$.`,
     parts:[
      {q:R`Write an expression for $H(\omega)$ valid for all real $\omega$ and sketch it on $[-3\pi,3\pi]$ for $\alpha=\tfrac12$.`,
       a:R`$H(\omega)=\sum_{k=-\infty}^{\infty}\mathrm{rect}\Big(\dfrac{\omega-2\pi k}{2\alpha\pi}\Big)$: unit-height boxes of width $\pi$ centered at $0,\pm2\pi$ (and so on) for $\alpha=\tfrac12$.`},
      {q:R`Derive $h(n)$ and sketch it for $\alpha=\tfrac12$, $n=-4,\dots,4$.`,
       a:R`$h(n)=\tfrac1{2\pi}\int_{-\alpha\pi}^{\alpha\pi}e^{j\omega n}d\omega=\dfrac{\sin(\alpha\pi n)}{\pi n}=\alpha\,\mathrm{sinc}(\alpha n)$. For $\alpha=\tfrac12$: $h(0)=\tfrac12$, $h(\pm1)=\tfrac1\pi\approx0.318$, $h(\pm2)=0$, $h(\pm3)=-\tfrac1{3\pi}\approx-0.106$, $h(\pm4)=0$.`},
      {q:R`What is $h(n)$ when $\alpha=1$? Interpret.`,
       a:R`$h(n)=\mathrm{sinc}(n)=\delta(n)$: the filter passes the entire band $[-\pi,\pi]$, so it is the identity.`},
      {q:R`Design a band-pass filter with pass-band $|\omega|\in(\pi/4,3\pi/4)$ from $h$.`,
       a:R`Modulate a low-pass of half-width $\pi/4$ to center $\pi/2$: $g(n)=2h_{1/4}(n)\cos(\tfrac\pi2n)$ with $h_{1/4}(n)=\tfrac14\mathrm{sinc}(n/4)$; the two shifted copies of the rect each carry weight $\tfrac12$, restored by the factor 2.`},
      {q:R`In a streaming application, why must $h$ be windowed, which window is worst, and what is the trade-off?`,
       a:R`$h$ has infinite support so each output would need infinitely many multiplies; truncating to a finite window makes it FIR. The rectangular window is worst: its sharp cut creates large sidelobes and Gibbs ripple ($\approx9\%$) near the band edge. Tapered windows reduce ripple but widen the transition band for the same length.`}
     ]}
  ]
 },
 {
  id:"edge", name:"Discrete derivatives and edge detection", prob:22, trend:"stable",
  years:["2020 Q2","2022 P3"],
  evidence: R`Two of eleven Exam 2s (and the 2017 final): FIR approximations to the first derivative at $n\pm\tfrac12$ ($[1,-1]$), the second derivative at $n$ ($[1,-2,1]$), and an edge test combining a large first derivative with a zero crossing of the second derivative.`,
  concepts:[
   R`Forward/backward differences: $x(n)-x(n-1)$ approximates $s'(t)$ at $t=n-\tfrac12$ ($h=\delta(n)-\delta(n-1)$); $x(n+1)-x(n)$ at $t=n+\tfrac12$; central difference $\tfrac12[x(n+1)-x(n-1)]$ at $t=n$.`,
   R`Second derivative at $n$: $x(n+1)-2x(n)+x(n-1)$, $h=\delta(n+1)-2\delta(n)+\delta(n-1)$, $H=2\cos\omega-2=-4\sin^2(\omega/2)$.`,
   R`Edge test: $|d_1(n)|>T$ and $d_2$ changes sign between $n-1,n$ or $n,n+1$ (a discrete zero crossing). Using both localizes the edge at the extremum of the gradient and rejects ramps.`,
   R`Derivatives amplify noise ($|H|$ grows with $\omega$); smooth first (Gaussian), giving derivative-of-Gaussian / Laplacian-of-Gaussian detectors. 2-D: gradient magnitude and direction, Laplacian $\nabla^2$.`
  ],
  problems:[
   { title:"Derivative filters and an edge detector", points:25,
     intro: R`Let $x(n)=s(n)$ be samples (period 1) of a smooth signal $s(t)$.`,
     parts:[
      {q:R`Give FIR filters whose outputs approximate $s'(t)$ at $t=n-\tfrac12$ and at $t=n$, and their frequency responses.`,
       a:R`$h_a=\delta(n)-\delta(n-1)$, $H_a=1-e^{-j\omega}$, $|H_a|=2|\sin(\omega/2)|$ (with a half-sample delay). Central: $h_c=\tfrac12[\delta(n+1)-\delta(n-1)]$, $H_c=j\sin\omega$, which is exactly the ideal $j\omega$ only for small $\omega$ and falls to zero at $\omega=\pi$.`},
      {q:R`Give the FIR approximation to $s''(t)$ at $t=n$ and its frequency response. Compare with the ideal $-\omega^2$.`,
       a:R`$h_2=\delta(n+1)-2\delta(n)+\delta(n-1)$, $H_2=2\cos\omega-2=-4\sin^2(\omega/2)\approx-\omega^2$ for small $\omega$; at $\omega=\pi$ it is $-4$ instead of $-\pi^2\approx-9.87$.`},
      {q:R`Specify an edge-detection rule using both derivatives.`,
       a:R`Compute $d_1=h_c*x$ and $d_2=h_2*x$. Declare an edge at $n$ if $|d_1(n)|\ge T$ and ($d_2(n)d_2(n-1)\le0$ or $d_2(n)d_2(n+1)\le0$): a large gradient together with a zero crossing of the second derivative.`},
      {q:R`Why use both derivatives rather than thresholding $|d_1|$ alone?`,
       a:R`A threshold on $|d_1|$ alone marks every sample on a wide ramp as an edge and gives thick, poorly localized responses whose width depends on $T$. The zero crossing of $d_2$ locates the extremum of the gradient, yielding a single well-localized edge per transition; the magnitude test suppresses zero crossings caused by noise.`},
      {q:R`How does noise affect these filters and what is the standard remedy?`,
       a:R`$|H|$ grows with frequency, so derivative filters amplify high-frequency noise (the second derivative worst of all). Pre-smooth with a Gaussian of width matched to the noise and edge scale (equivalently use derivative-of-Gaussian / Laplacian-of-Gaussian kernels).`}
     ]}
  ]
 },
 {
  id:"samp2", name:"Sampling for acquisition and display (Exam 2 version, incl. non-rectangular sampling)", prob:25, trend:"stable",
  years:["2020 Q3","2025 P4"],
  evidence: R`Twice on Exam 2: rotated/scaled (non-rectangular) sampling via $f(x)=\tilde f(Ax)$ in 2020, and the detector-plus-display $\mathrm{sinc}^2$ chain in 2025. See the Exam 1 sampling topic for the full chain; here the twist is the linear-transformation property of the CSFT.`,
  concepts:[
   R`Linear coordinate change: $f(x)=\tilde f(Ax)\Rightarrow F(u)=\dfrac1{|\det A|}\tilde F(A^{-t}u)$. For $A=cB$ with $B$ a rotation: $F(u)=\dfrac1{c^2}\tilde F(Bu/c)$ (rotated by the same angle, scaled).`,
   R`Rectangular sampling of $f$ with period $T$ corresponds to sampling $\tilde f$ on the lattice $\{TA(m,n)^t\}$ (rotated/scaled grid). Nyquist for $f$ must account for the rotated, scaled support: a disk of radius $\omega_c$ in $\tilde F$ becomes a disk of radius $c\omega_c$ in $F$ (if $A=cB$), so $T&lt;\dfrac1{2c\omega_c}$.`,
   R`Hexagonal sampling packs the replicas more efficiently than rectangular for circularly band-limited images (about 13% fewer samples).`
  ],
  problems:[
   { title:"Sheared sampling lattice", points:25,
     intro: R`Let $\tilde f(x,y)$ be band-limited to the disk $\sqrt{u^2+v^2}&lt;\omega_c$ and let $f(x)=\tilde f(Ax)$ with the shear $A=\begin{bmatrix}1&1\\0&1\end{bmatrix}$.`,
     parts:[
      {q:R`Compute $A^{-1}$, $A^{-t}$ and $|\det A|$.`,
       a:R`$\det A=1$, $A^{-1}=\begin{bmatrix}1&-1\\0&1\end{bmatrix}$, $A^{-t}=\begin{bmatrix}1&0\\-1&1\end{bmatrix}$.`},
      {q:R`Express $F(u,v)$ in terms of $\tilde F$ and describe its support.`,
       a:R`$F(u)=\tfrac1{|\det A|}\tilde F(A^{-t}u)=\tilde F(u,\;v-u)$. The disk is sheared vertically into an ellipse: the support is $\{(u,v):u^2+(v-u)^2&lt;\omega_c^2\}$, tilted along the diagonal with semi-axes $\omega_c\sqrt{(3\pm\sqrt5)/2}$, i.e. about $1.62\omega_c$ and $0.62\omega_c$.`},
      {q:R`What is the largest $|u|$ and the largest $|v|$ occurring in the support of $F$, and hence the largest rectangular sampling period $T$ for $s(m,n)=f(Tm,Tn)$?`,
       a:R`$|u|&lt;\omega_c$ (the shear does not change $u$); $|v|$ is maximized when $(u,v-u)$ points along $(1,1)/\sqrt2$: $|v|_{\max}=\sqrt2\,\omega_c$. Rectangular sampling with equal periods needs $\tfrac1{2T}>\sqrt2\omega_c$, so $T&lt;\dfrac1{2\sqrt2\,\omega_c}$, versus $\tfrac1{2\omega_c}$ for $\tilde f$ itself.`},
      {q:R`Where in the $\tilde f$ plane do the samples $s(m,n)$ fall? Sketch.`,
       a:R`$s(m,n)=\tilde f(TA(m,n)^t)=\tilde f(T(m+n),Tn)$: rows at $y=Tn$ with horizontal spacing $T$ but shifted by $Tn$ per row, a sheared (parallelogram) lattice.`},
      {q:R`Would it be smarter to sample $\tilde f$ directly on a rectangular grid? What general principle does this illustrate?`,
       a:R`Yes: $\tilde f$ needs only $T&lt;1/(2\omega_c)$, twice as coarse in the worst direction. Sampling should be matched to the spectral support; a coordinate change that elongates the spectrum forces denser sampling unless the sampling lattice is transformed with it (the replica lattice is $A^{-t}$ times the original).`}
     ]}
  ]
 },
 {
  id:"mmse", name:"MMSE linear estimation and least squares (Exam 2 version)", prob:22, trend:"stable",
  years:["2018 P2"],
  evidence: R`One Exam 2 problem (2018) but a recurring final-exam topic (2017, 2023, 2024, 2026): derive the MSE $a-2\theta^tb+\theta^tR\theta$, set the gradient to zero for $\theta^\ast=R^{-1}b$, give the sample estimates $\hat R,\hat b$ from training data, and state which quantities are random.`,
  concepts:[
   R`Linear estimator $\hat X=\theta^tZ$: $\mathrm{MSE}(\theta)=E[(X-\theta^tZ)^2]=a-2\theta^tb+\theta^tR\theta$ with $a=E[X^2]$, $b=E[ZX]$, $R=E[ZZ^t]$. Minimizer $\theta^\ast=R^{-1}b$, minimum MSE $a-b^tR^{-1}b$. Orthogonality: $E[(X-\theta^{\ast t}Z)Z]=0$.`,
   R`Least squares from training data: $\hat R=\tfrac1N\sum_kz_kz_k^t$, $\hat b=\tfrac1N\sum_kz_kx_k$, $\hat\theta=\hat R^{-1}\hat b$. $R,b,a,\theta^\ast$ are deterministic numbers; $\hat R,\hat b,\hat a,\hat\theta$ are random variables (functions of the data).`,
   R`For jointly Gaussian $(X,Z)$ the MMSE estimator is linear, so no nonlinear estimator does better.`
  ],
  problems:[
   { title:"MMSE weights for a noisy pixel neighborhood", points:25,
     intro: R`A pixel $X$ is estimated from the vector $Z\in\mathbb R^p$ of its noisy neighbors via $\hat X=\theta^tZ$. Assume zero means and define $a=E[X^2]$, $b=E[ZX]$, $R=E[ZZ^t]$.`,
     parts:[
      {q:R`Derive $\mathrm{MSE}(\theta)=E[(X-\theta^tZ)^2]$ in terms of $a,b,R$.`,
       a:R`$E[X^2-2\theta^tZX+\theta^tZZ^t\theta]=a-2\theta^tb+\theta^tR\theta$.`},
      {q:R`Find $\theta^\ast$ and the minimum MSE.`,
       a:R`$\nabla_\theta\mathrm{MSE}=-2b+2R\theta=0\Rightarrow\theta^\ast=R^{-1}b$; $\mathrm{MSE}(\theta^\ast)=a-b^tR^{-1}b$.`},
      {q:R`Given training pairs $(x_k,z_k)$, $k=0,\dots,N-1$, give practical estimates of $a,b,R$ and of $\theta$.`,
       a:R`$\hat a=\tfrac1N\sum x_k^2$, $\hat b=\tfrac1N\sum z_kx_k$, $\hat R=\tfrac1N\sum z_kz_k^t$, $\hat\theta=\hat R^{-1}\hat b$ (requires $N\ge p$ for $\hat R$ to be invertible; in practice $N\gg p$).`},
      {q:R`Classify each of $R,b,a,\theta^\ast,\hat R,\hat b,\hat a,\hat\theta$ as random or deterministic.`,
       a:R`$R,b,a$ are expectations, hence deterministic; $\theta^\ast=R^{-1}b$ deterministic. $\hat R,\hat b,\hat a$ are functions of random training data, hence random; so is $\hat\theta$.`},
      {q:R`Special case: $Z=X\mathbf 1+W$ with $W\sim N(0,\sigma_w^2I)$ independent of $X\sim N(0,\sigma_x^2)$ ($p$ identical noisy copies). Compute $\theta^\ast$ and the MMSE.`,
       a:R`$b=\sigma_x^2\mathbf 1$, $R=\sigma_x^2\mathbf 1\mathbf 1^t+\sigma_w^2I$. By symmetry $\theta^\ast=c\mathbf 1$ with $c(p\sigma_x^2+\sigma_w^2)=\sigma_x^2$, so $\theta^\ast=\dfrac{\sigma_x^2}{p\sigma_x^2+\sigma_w^2}\mathbf 1$ (a shrunken average) and $\mathrm{MMSE}=\sigma_x^2-\dfrac{p\sigma_x^4}{p\sigma_x^2+\sigma_w^2}=\dfrac{\sigma_x^2\sigma_w^2}{p\sigma_x^2+\sigma_w^2}$.`}
     ]}
  ]
 },
 {
  id:"hvs", name:"Display resolution, pixels per degree, and incoherent light", prob:15, trend:"stable",
  years:["2018 P3","2024 P4"],
  evidence: R`Occasional short problems: compute the width, pixels per inch and pixels per degree of a TV from its diagonal and viewing distance and decide whether a one-pixel checkerboard is visible (2018); show that incoherent light sources add in power because their fields are independent (2024).`,
  concepts:[
   R`16:9 display: width $=D\cdot\dfrac{16}{\sqrt{16^2+9^2}}=D\cdot\dfrac{16}{18.36}\approx0.872D$; ppi $=$ horizontal pixels / width; pixels per degree $\approx$ ppi $\times d\times\pi/180$ at distance $d$ (small-angle).`,
   R`Human acuity: contrast sensitivity falls to zero near 50–60 cycles/degree; a one-pixel checkerboard has frequency (ppd)/2 cycles/degree, so about 120 ppd hides the pixel grid.`,
   R`Incoherent fields $e_0,e_1$ are independent zero-mean processes: $E[|e_0+e_1|^2]=E|e_0|^2+E|e_1|^2$ (cross terms vanish), so powers add. Coherent fields add in amplitude and interfere.`
  ],
  problems:[
   { title:"Can you see the pixels?", points:20,
     intro: R`A 27-inch (diagonal) 16:9 monitor with $3840\times2160$ pixels is viewed from $d=24$ inches.`,
     parts:[
      {q:R`Give the display width and the pixels per inch (as fractions, then approximate).`,
       a:R`Width $=27\cdot\dfrac{16}{\sqrt{337}}=\dfrac{432}{18.36}\approx23.5$ in. ppi $=\dfrac{3840}{23.5}\approx163$.`},
      {q:R`Compute the pixels per degree.`,
       a:R`One degree at 24 in subtends $24\cdot\tan(1^\circ)\approx24\cdot0.01745=0.419$ in, so ppd $\approx163\times0.419\approx68$.`},
      {q:R`Is a one-pixel black/white checkerboard visible? Justify with the spatial frequency in cycles per degree.`,
       a:R`The checkerboard alternates every pixel: one cycle per two pixels, so $68/2=34$ cycles/degree. Human contrast sensitivity extends to about 50–60 cpd (very low but nonzero at 34 cpd for full contrast), so the grid is faintly visible; at 6 ft it would be about 100 ppd (50 cpd) and essentially invisible.`},
      {q:R`Two incoherent sources produce fields $e_0(t),e_1(t)$ at a pixel. Show the measured power is $P_0+P_1$.`,
       a:R`$P_T\propto E[|e_0+e_1|^2]=E|e_0|^2+E|e_1|^2+2\,\mathrm{Re}\,E[e_0e_1^\ast]$. Incoherence means independence with zero mean, so $E[e_0e_1^\ast]=E[e_0]E[e_1^\ast]=0$ and $P_T=P_0+P_1$: incoherent light adds in energy, not amplitude.`}
     ]}
  ]
 }
 ]
};
})();
