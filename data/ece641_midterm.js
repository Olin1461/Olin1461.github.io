window.EXAMDB = window.EXAMDB || {};
(function(){
const R = String.raw;
const C = window.EXAMDB.ece641 = window.EXAMDB.ece641 || {id:"ece641", code:"ECE 60141 (ECE 641)", title:"Foundations of Computational Imaging (formerly Model-Based Image & Signal Processing)", exams:{}};
C.exams.midterm = {
 id:"midterm", name:"Midterm", years:"Fall 2016 – Fall 2025 (10 midterms)",
 format:"3–4 multi-part problems, 50–60 min, closed book with the course fact sheet (2023+); open-book 120 min in 2020–2022",
 mockCount:4, mockTime:"60 minutes",
 notes: R`<b>What the last ten midterms look like.</b> Every midterm since 2017 contains a MAP-estimation problem for a linear Gaussian forward model (closed form, gradient, gradient descent and ICD updates). A surrogate-function / majorization-minimization problem appeared in 6 of 10 years. Since 2020 the third problem has shifted toward proximal maps, ADMM and plug-and-play (all of 2022–2025 had one), and 2025 devoted three of four problems to proximal maps, the shrinkage operator and contraction mappings. Expect roughly: one MAP/optimization problem, one surrogate or GMRF problem, one proximal-map/PnP problem, plus short "explain in words" parts.`,
 categories:[
 {
  id:"map", name:"MAP estimation for linear Gaussian models: closed form, gradient descent, ICD", prob:88, trend:"stable",
  years:["2017 P2","2018 P1–P2","2019 P2","2020 Q2","2021 Q2","2023 P2","2024 P1","2025 P3 (proximal form)"],
  evidence: R`Appeared in 8 of 10 midterms, always worth 30–48 points. The recurring asks are: write the forward model $Y=AX+W$ and the prior; write $p(y|x)$; derive $\nabla f(x)$; solve $\nabla f(\hat x)=0$ for the closed form; give gradient-descent pseudo-code; derive the ICD (coordinate-descent) update for pixel $x_i$; discuss what happens to the estimate as the regularization parameter goes to 0 or $\infty$; and state whether MAP = MMSE (yes, for jointly Gaussian models).`,
  concepts:[
   R`Forward model $Y = AX + W$, $W\sim N(0,\Lambda^{-1})$: $\;-\log p(y|x) = \tfrac12\|y-Ax\|_\Lambda^2 + \text{const}$, where $\|v\|_\Lambda^2 = v^t\Lambda v$.`,
   R`ML estimate $\hat x_{ML} = (A^t\Lambda A)^{-1}A^t\Lambda y$ exists and is unique only if $A^t\Lambda A$ is invertible (needs $M\ge N$ and full column rank). ML has low bias but high variance and is ill-posed when $M&lt;N$.`,
   R`Gaussian prior $X\sim N(0,B^{-1})$ (GMRF with precision $B$) gives the MAP cost $f(x)=\tfrac12\|y-Ax\|_\Lambda^2+\tfrac12 x^tBx$ and $\hat x_{MAP}=(A^t\Lambda A+B)^{-1}A^t\Lambda y$. For jointly Gaussian $(X,Y)$ the MAP and MMSE estimates coincide (posterior is Gaussian, mean = mode).`,
   R`Gradient $\nabla f(x) = -A^t\Lambda(y-Ax)+Bx$; Hessian $A^t\Lambda A + B$. Gradient descent: $x\leftarrow x+\mu\,[A^t\Lambda(y-Ax)-Bx]$. Exact line search along $d$: $\alpha^*=\dfrac{d^t[A^t\Lambda(y-Ax)-Bx]}{d^t(A^t\Lambda A+B)d}$.`,
   R`ICD / coordinate descent for pixel $i$ with $e=y-Ax$: $\alpha=\dfrac{A_{*,i}^t\Lambda e - B_{i,*}x}{A_{*,i}^t\Lambda A_{*,i}+B_{i,i}}$, then $x_i\leftarrow x_i+\alpha$, $e\leftarrow e-\alpha A_{*,i}$. Keeping the residual $e$ makes each pixel update cost only the sparsity of column $A_{*,i}$.`,
   R`Scalar regularization $f(x)=\tfrac1{2\sigma_w^2}\|y-Ax\|^2+\tfrac1{2\sigma_x^2}\|x\|^2$ gives $\lambda=\sigma_w^2/\sigma_x^2$ and $\hat x=(A^tA+\lambda I)^{-1}A^ty$. As $\beta\to0$ the prior becomes flat (estimate $\to$ ML); as $\beta\to\infty$ the prior collapses to its mode and $\hat x\to\arg\min u(x)$, independent of the data.`,
   R`A general prior $p(x)=\frac1z\exp\{-\beta u(x)\}$ is a Gibbs distribution; the MAP cost is $-\log p(y|x)-\log p(x)$ up to constants.`
  ],
  problems:[
   { title:"Fusing two measurement systems", points:36,
     intro: R`An image $X\in\mathbb R^N$ with prior $X\sim N(0,\sigma_x^2I)$ is measured by two independent instruments: $Y_1=A_1X+W_1$ with $W_1\sim N(0,\sigma_1^2I)$, $Y_1\in\mathbb R^{M_1}$, and $Y_2=A_2X+W_2$ with $W_2\sim N(0,\sigma_2^2I)$, $Y_2\in\mathbb R^{M_2}$. $W_1$, $W_2$ and $X$ are mutually independent.`,
     parts:[
      {q:R`Write $p(y_1,y_2|x)$ and show that it factors. Then write the MAP cost function $f(x)$ with constants dropped.`,
       a:R`Given $x$, $Y_1$ and $Y_2$ are independent, so $p(y_1,y_2|x)=p(y_1|x)p(y_2|x)$ with $p(y_i|x)=(2\pi\sigma_i^2)^{-M_i/2}\exp\{-\|y_i-A_ix\|^2/2\sigma_i^2\}$. Then $$f(x)=\frac1{2\sigma_1^2}\|y_1-A_1x\|^2+\frac1{2\sigma_2^2}\|y_2-A_2x\|^2+\frac1{2\sigma_x^2}\|x\|^2 .$$`},
      {q:R`Show that $f$ can be written in the single-instrument form $\tfrac12\|y-Ax\|_\Lambda^2+\tfrac1{2\sigma_x^2}\|x\|^2$ and identify $y$, $A$ and $\Lambda$.`,
       a:R`Stack: $y=\begin{bmatrix}y_1\\y_2\end{bmatrix}$, $A=\begin{bmatrix}A_1\\A_2\end{bmatrix}$, $\Lambda=\begin{bmatrix}\sigma_1^{-2}I&0\\0&\sigma_2^{-2}I\end{bmatrix}$. Then $\|y-Ax\|_\Lambda^2=\sigma_1^{-2}\|y_1-A_1x\|^2+\sigma_2^{-2}\|y_2-A_2x\|^2$.`},
      {q:R`Compute $\nabla f(x)$ and the closed-form MAP estimate. Is it unique even if $A_1$ and $A_2$ individually have non-trivial null spaces?`,
       a:R`$\nabla f=-\sigma_1^{-2}A_1^t(y_1-A_1x)-\sigma_2^{-2}A_2^t(y_2-A_2x)+\sigma_x^{-2}x$. Setting it to zero: $$\hat x=\Big(\frac{A_1^tA_1}{\sigma_1^2}+\frac{A_2^tA_2}{\sigma_2^2}+\frac I{\sigma_x^2}\Big)^{-1}\Big(\frac{A_1^ty_1}{\sigma_1^2}+\frac{A_2^ty_2}{\sigma_2^2}\Big).$$ Unique for any $A_1,A_2$: the Hessian contains $\sigma_x^{-2}I\succ0$, so $f$ is strictly convex.`},
      {q:R`Interpret $\hat x$ when $A_1=A_2=I$ (two noisy copies of the same image).`,
       a:R`$\hat x=\dfrac{y_1/\sigma_1^2+y_2/\sigma_2^2}{1/\sigma_1^2+1/\sigma_2^2+1/\sigma_x^2}$: an inverse-variance-weighted average of the two measurements, shrunk toward the prior mean 0 by the factor set by $\sigma_x^2$. The more precise instrument dominates.`},
      {q:R`Derive the ICD update for pixel $i$, maintaining the two residuals $e_1=y_1-A_1x$ and $e_2=y_2-A_2x$.`,
       a:R`With $x_i\leftarrow x_i+\alpha$: $0=-\sigma_1^{-2}A_{1,*,i}^t(e_1-\alpha A_{1,*,i})-\sigma_2^{-2}A_{2,*,i}^t(e_2-\alpha A_{2,*,i})+\sigma_x^{-2}(x_i+\alpha)$, so $$\alpha=\frac{\sigma_1^{-2}A_{1,*,i}^te_1+\sigma_2^{-2}A_{2,*,i}^te_2-\sigma_x^{-2}x_i}{\sigma_1^{-2}\|A_{1,*,i}\|^2+\sigma_2^{-2}\|A_{2,*,i}\|^2+\sigma_x^{-2}},$$ then $x_i\leftarrow x_i+\alpha$, $e_1\leftarrow e_1-\alpha A_{1,*,i}$, $e_2\leftarrow e_2-\alpha A_{2,*,i}$.`},
      {q:R`Suppose instrument 2 becomes useless ($\sigma_2\to\infty$). What do the MAP estimate and the ICD update reduce to? And if $\sigma_x\to\infty$?`,
       a:R`$\sigma_2\to\infty$ removes every $\sigma_2^{-2}$ term: the single-instrument MAP estimate $(A_1^tA_1/\sigma_1^2+I/\sigma_x^2)^{-1}A_1^ty_1/\sigma_1^2$ and the standard ICD update. $\sigma_x\to\infty$ removes the prior: the estimate becomes the (weighted) ML estimate, which exists uniquely only if $\begin{bmatrix}A_1\\A_2\end{bmatrix}$ has full column rank.`}
     ]},
   { title:"MAP deblurring in the Fourier domain", points:32,
     intro: R`Let $Y=HX+W$ where $H\in\mathbb R^{N\times N}$ is a circulant blur (periodic convolution with $h$), $W\sim N(0,\sigma_w^2I)$, and $X\sim N(0,B^{-1})$ with $B$ circulant (a homogeneous GMRF with periodic boundary). Recall that every $N\times N$ circulant matrix is diagonalized by the DFT: $H=F^{-1}\mathrm{diag}(\tilde h)F$ where $\tilde h_k$ is the DFT of $h$; similarly $B=F^{-1}\mathrm{diag}(\tilde b)F$ with $\tilde b_k>0$.`,
     parts:[
      {q:R`Write the MAP cost $f(x)$ and its closed-form minimizer.`,
       a:R`$f(x)=\tfrac1{2\sigma_w^2}\|y-Hx\|^2+\tfrac12x^tBx$, $\hat x=(H^tH+\sigma_w^2B)^{-1}H^ty$.`},
      {q:R`Show that $\hat x$ can be computed with two FFTs and give the per-frequency filter.`,
       a:R`All matrices share the eigenvectors $F^{-1}$: $H^tH+\sigma_w^2B=F^{-1}\mathrm{diag}(|\tilde h_k|^2+\sigma_w^2\tilde b_k)F$ and $H^ty=F^{-1}\mathrm{diag}(\tilde h_k^\ast)F y$. Hence $$\hat{\tilde x}_k=\frac{\tilde h_k^\ast}{|\tilde h_k|^2+\sigma_w^2\tilde b_k}\,\tilde y_k,$$ i.e. FFT $y$, multiply by the filter, inverse FFT. This is a Wiener-type filter; when $\tilde b_k=1/\sigma_x^2$ it is exactly the Wiener filter for white $X$.`},
      {q:R`What happens at frequencies where $\tilde h_k=0$ (the blur destroys them)? Compare with the ML estimate.`,
       a:R`MAP: $\hat{\tilde x}_k=0$, the prior fills in the lost frequency with its mode. ML ($B=0$): $\tilde h_k^\ast/|\tilde h_k|^2=1/\tilde h_k$ is undefined and nearly-zero $\tilde h_k$ amplify noise without bound; the ML estimate does not exist (or is wildly ill-conditioned). The prior regularizes exactly where the data are silent.`},
      {q:R`For gradient descent $x\leftarrow x-\mu\nabla f(x)$, give the range of $\mu$ that converges in terms of $\tilde h_k$ and $\tilde b_k$, and the frequency component that converges slowest.`,
       a:R`The Hessian $Q=H^tH/\sigma_w^2+B$ has eigenvalues $q_k=|\tilde h_k|^2/\sigma_w^2+\tilde b_k$. Convergence requires $0&lt;\mu&lt;2/\max_kq_k$. The error at frequency $k$ contracts by $|1-\mu q_k|$, so the slowest component is the one with the smallest $q_k$: typically a high frequency where the blur is weak ($\tilde h_k\approx0$) and the prior penalty $\tilde b_k$ alone must do the work.`},
      {q:R`Is the ICD (coordinate descent) approach attractive here? Explain in terms of the cost of a pixel update and the structure of $H$.`,
       a:R`Each ICD update touches one column of $H$ (the blur kernel support, $K$ pixels) and one row of $B$, costing $O(K)$; a full pass is $O(NK)$, comparable to an FFT pair only if $K\approx\log N$. But since the exact solution is available in $O(N\log N)$ via part b), iterative methods are unnecessary for this circulant case; ICD becomes attractive when $H$ or $B$ is not shift invariant (space-varying blur, non-periodic boundaries, positivity constraints).`}
     ]}
  ]
 },
 {
  id:"prox", name:"Proximal maps, ADMM and Plug-and-Play (shrinkage, contraction mappings, Mann iteration)", prob:82, trend:"rising",
  years:["2020 Q4","2022 Q3","2023 P1","2024 P3","2025 P2–P4"],
  evidence: R`Absent before 2020, present in every midterm since 2022, and dominant in 2025 (shrinkage operator, proximal-map interpretation, contraction mappings). Typical asks: give the explicit proximal map of a quadratic or of $\lambda\|x\|_1$ (soft threshold); interpret $F$ and $H$ as MAP estimates; state the forward and prior model implied by $H$; explain how to train a denoiser $\hat H_\theta$; write variable splitting, the augmented Lagrangian and ADMM; determine if a map is a contraction / non-expansive and whether the plain iteration or the Mann iteration converges.`,
  concepts:[
   R`Proximal map $F(v)=\arg\min_x\{f(x)+\tfrac1{2\sigma^2}\|x-v\|^2\}$. For proper closed convex $f$ the objective is strictly convex, so $F(v)$ exists and is unique. Interpretation: MAP estimate under the prior $X\sim N(v,\sigma^2 I)$ with likelihood $\exp\{-f\}$.`,
   R`$H(v)=\arg\min_x\{\tfrac1{2\sigma^2}\|v-x\|^2+h(x)\}$ is a MAP denoiser for $V=X+W$, $W\sim N(0,\sigma^2I)$, prior $p(x)\propto e^{-h(x)}$. Iterating $x\leftarrow H(x)$ drives $x$ to $\arg\min h$ (the prior mode).`,
   R`Quadratic data term: $F(v;y)=v+\big(\tfrac1{\sigma^2}I+A^t\Lambda A\big)^{-1}A^t\Lambda(y-Av)$.`,
   R`Soft threshold / shrinkage: $\operatorname{prox}_{\lambda|\cdot|}(y)=S_\lambda(y)=\operatorname{sign}(y)\max(|y|-\lambda,0)$, applied componentwise for $\lambda\|x\|_1$. Positivity constraint (indicator of $x\ge0$): $H(z)=\max(z,0)$ componentwise.`,
   R`Variable splitting: $\min_{x=v} f(x)+h(v)$. Augmented Lagrangian $L(x,v;u)=f(x)+h(v)+\tfrac a2\|x-v+u\|^2$ (scaled dual $u$). ADMM: $x\leftarrow F(v-u)$, $v\leftarrow H(x+u)$, $u\leftarrow u+(x-v)$ with $\sigma^2=1/a$.`,
   R`Plug-and-play: replace $H$ by any denoiser (e.g. a CNN) trained on pairs $(x_k,\;x_k+\sigma w_k)$ with loss $\sum_k\|x_k-H_\theta(x_k+\sigma w_k)\|^2$. Equilibrium: $F(x^\ast-u^\ast)=x^\ast=H(x^\ast+u^\ast)$; if $H$ is a proximal map this implies $\nabla f(x^\ast)+\nabla h(x^\ast)=0$.`,
   R`Contraction ($\|T x-Ty\|\le L\|x-y\|$, $L&lt;1$) gives convergence of $x\leftarrow Tx$ (Banach). Non-expansive ($L\le1$) does not (rotations, reflections), but the Mann iteration $x\leftarrow(1-\rho)x+\rho Tx$, $\rho\in(0,1)$, converges to a fixed point whenever one exists. Proximal maps are firmly non-expansive; $2F-I$ is then non-expansive and $T=(2H-I)(2F-I)$ is non-expansive.`
  ],
  problems:[
   { title:"Proximal maps of three simple functions", points:27,
     intro: R`For $v\in\mathbb R^N$ and $\sigma>0$ define $\operatorname{prox}_{h}(v)=\arg\min_x\{h(x)+\tfrac1{2\sigma^2}\|x-v\|^2\}$.`,
     parts:[
      {q:R`Compute $\operatorname{prox}_h$ for $h(x)=\tfrac\beta2\|x\|^2$ and interpret it.`,
       a:R`Gradient: $\beta x+\sigma^{-2}(x-v)=0\Rightarrow x=\dfrac{v}{1+\beta\sigma^2}$: a uniform shrinkage toward 0. It is the MAP estimate for $V=X+W$ with $X\sim N(0,I/\beta)$, $W\sim N(0,\sigma^2I)$.`},
      {q:R`Compute $\operatorname{prox}_h$ for $h(x)=\lambda\|x\|_2$ (the Euclidean norm, not squared), for $N>1$.`,
       a:R`By symmetry the solution is $x=cv$ with $c\ge0$. For $x\ne0$ the stationarity condition is $\lambda\dfrac{x}{\|x\|}+\sigma^{-2}(x-v)=0$, giving $x=\Big(1-\dfrac{\lambda\sigma^2}{\|v\|}\Big)v$ when $\|v\|>\lambda\sigma^2$; otherwise the minimum is at $x=0$. So $\operatorname{prox}_h(v)=\max\Big(1-\dfrac{\lambda\sigma^2}{\|v\|},0\Big)v$: group (vector) soft-thresholding, which zeros the whole vector or shrinks its length while keeping its direction.`},
      {q:R`Compute $\operatorname{prox}_h$ for the indicator $h(x)=0$ if $x\in[0,1]^N$, $+\infty$ otherwise.`,
       a:R`The quadratic is separable, so clip each component: $[\operatorname{prox}_h(v)]_i=\min(\max(v_i,0),1)$, the Euclidean projection onto the box.`},
      {q:R`Show that for every proper closed convex $h$, $\operatorname{prox}_h(v)$ exists and is unique.`,
       a:R`$g(x)=h(x)+\tfrac1{2\sigma^2}\|x-v\|^2$ is the sum of a convex function and a strictly convex quadratic, hence strictly convex; it is proper (finite where $h$ is) and coercive because the quadratic dominates, and closed, so a minimizer exists and strict convexity makes it unique.`},
      {q:R`Explain in words why $\operatorname{prox}_h$ is often called a "denoiser", and which of the three maps above would you call a denoiser for sparse signals.`,
       a:R`$\operatorname{prox}_h(v)$ returns the most probable $x$ given the noisy observation $v=x+w$ with prior $e^{-h}$, so it removes noise consistent with the prior. The group soft-threshold of part b) is the sparse-signal denoiser: small (noise-like) vectors are set exactly to zero while large ones are preserved up to shrinkage.`}
     ]},
   { title:"ADMM with a linear splitting: total-variation denoising", points:40,
     intro: R`Consider $\hat x=\arg\min_x\Big\{\tfrac1{2\sigma^2}\|y-x\|^2+\beta\|Dx\|_1\Big\}$ where $D\in\mathbb R^{P\times N}$ computes all neighboring pixel differences $x_s-x_r$. Instead of splitting $x=v$, introduce $v=Dx$.`,
     parts:[
      {q:R`Write the equivalent constrained problem and the augmented Lagrangian $L(x,v;u)$ with parameter $a>0$ (scaled dual $u$).`,
       a:R`$(\hat x,\hat v)=\arg\min_{v=Dx}\{\tfrac1{2\sigma^2}\|y-x\|^2+\beta\|v\|_1\}$ and $$L(x,v;u)=\tfrac1{2\sigma^2}\|y-x\|^2+\beta\|v\|_1+\tfrac a2\|Dx-v+u\|^2.$$`},
      {q:R`Derive the $x$-update $\arg\min_xL$ in closed form.`,
       a:R`$-\sigma^{-2}(y-x)+aD^t(Dx-v+u)=0\Rightarrow(\sigma^{-2}I+aD^tD)x=\sigma^{-2}y+aD^t(v-u)$, so $x\leftarrow(\sigma^{-2}I+aD^tD)^{-1}\big(\sigma^{-2}y+aD^t(v-u)\big)$. $D^tD$ is the graph Laplacian of the pixel lattice; with periodic boundaries this solve is an FFT.`},
      {q:R`Derive the $v$-update in closed form.`,
       a:R`$\arg\min_v\{\beta\|v\|_1+\tfrac a2\|v-(Dx+u)\|^2\}$ is separable: $v\leftarrow S_{\beta/a}(Dx+u)$, soft-thresholding each pixel difference.`},
      {q:R`Write the full ADMM iteration including the dual update, and state the equilibrium condition.`,
       a:R`<pre>u &larr; 0; v &larr; 0
Repeat {
   x &larr; (I/&sigma;&sup2; + a D^t D)^{-1} ( y/&sigma;&sup2; + a D^t (v - u) )
   v &larr; S_{&beta;/a}( D x + u )
   u &larr; u + ( D x - v )
}</pre> At convergence $Dx^\ast=v^\ast$, so the constraint holds and $x^\ast$ minimizes the original cost.`},
      {q:R`Compare this splitting with the standard $x=v$ splitting: what would the $v$-update be there, and why is the $v=Dx$ splitting preferred for this cost?`,
       a:R`With $x=v$ the $v$-update would be $\arg\min_v\{\beta\|Dv\|_1+\tfrac a2\|v-(x+u)\|^2\}$, which is itself a TV-denoising problem with no closed form. Splitting on $Dx$ moves the non-smooth $\ell_1$ term onto a variable where its proximal map is a simple shrinkage, leaving a quadratic (linear-solve) $x$-step.`},
      {q:R`How does the parameter $a$ affect the iterations, and does it change the final answer?`,
       a:R`$a$ trades off how strongly the split constraint is enforced per iteration against how aggressively each subproblem is solved; large $a$ makes $v\approx Dx$ quickly but slows the $x$-step's progress on the data term, small $a$ the reverse. The fixed point satisfies the original optimality conditions for any $a>0$, so the solution does not change, only the speed.`}
     ]},
   { title:"Spectral radius versus Lipschitz constant", points:25,
     intro: R`Let $H(x)=Mx$ with $M=\begin{bmatrix}0.5&1\\0&0.5\end{bmatrix}$ acting on $\mathbb R^2$.`,
     parts:[
      {q:R`Find the eigenvalues of $M$ and the fixed points of $H$.`,
       a:R`Upper triangular: eigenvalues $0.5,0.5$. Fixed points solve $(M-I)x=0$; $M-I$ is invertible (its determinant is $0.25$), so the only fixed point is $0$.`},
      {q:R`Is $H$ non-expansive? Compute $\|H(e_2)-H(0)\|$ for $e_2=(0,1)^t$.`,
       a:R`$Me_2=(1,0.5)^t$, so $\|H(e_2)-H(0)\|=\sqrt{1.25}\approx1.12>\|e_2\|=1$. $H$ is not non-expansive (its operator norm exceeds 1), hence not a contraction in the Euclidean norm.`},
      {q:R`Does the iteration $x\leftarrow H(x)$ converge anyway? Justify with $M^k$.`,
       a:R`$M^k=\begin{bmatrix}0.5^k&k\,0.5^{k-1}\\0&0.5^k\end{bmatrix}\to0$ because $k0.5^{k}\to0$. Yes, it converges to the fixed point $0$ for every $x_0$, although the first step can increase the norm. The spectral radius ($0.5&lt;1$) controls asymptotic convergence; the Lipschitz constant (about $1.12$) controls monotone contraction.`},
      {q:R`Why do the PnP convergence results require non-expansiveness (or firm non-expansiveness) rather than just "eigenvalues inside the unit circle"?`,
       a:R`The PnP operators are nonlinear, so there is no spectrum to speak of; Lipschitz-type bounds are the only global tool. Non-expansiveness of $T$ plus the existence of a fixed point is what makes the Mann iteration converge (Krasnoselskii–Mann), and firm non-expansiveness of the denoiser is what guarantees $T=(2H-I)(2F-I)$ is non-expansive.`},
      {q:R`Give a $2\times2$ matrix $M'$ with the same eigenvalues as $M$ for which $H'(x)=M'x$ is a contraction, and state its Lipschitz constant.`,
       a:R`$M'=0.5I$ (or any $0.5\,R$ with $R$ orthogonal): $\|M'x-M'y\|=0.5\|x-y\|$, Lipschitz constant $0.5$. Symmetric (normal) matrices have Lipschitz constant equal to their spectral radius; the non-normal $M$ does not.`}
     ]}
  ]
 },
 {
  id:"mm", name:"Surrogate functions and majorization–minimization", prob:75, trend:"stable",
  years:["2016 P3","2020 Q3","2021 Q4","2022 Q4","2023 P3","2024 P2"],
  evidence: R`Six of ten midterms. Recurring forms: sketch $f$ and a surrogate $q(x;x')$ at a given $x'$; find the best quadratic surrogate for $|x|$, $|x-z|$, $|x-x_r|^{1.1}$ or a sum of such terms (symmetric-bound method); find the maximum-curvature surrogate for a Poisson negative log-likelihood; build a separable quadratic surrogate for $\tfrac12\|y-Ax\|^2$ or $\tfrac12x^tBx-b^tx$ using the largest eigenvalue (which turns MM into gradient descent); prove the MM cost sequence is monotone non-increasing and convergent; and specify the resulting iterative algorithm.`,
  concepts:[
   R`Surrogate (majorizer) $q(x;x')$: $q(x';x')=f(x')$ and $q(x;x')\ge f(x)$ for all $x$. MM iteration $x^{k+1}=\arg\min_x q(x;x^k)$ gives $f(x^{k+1})\le q(x^{k+1};x^k)\le q(x^k;x^k)=f(x^k)$.`,
   R`If $f\ge0$ (or bounded below) the monotone sequence $C_k=f(x^k)$ converges. If $f$ and $q$ are differentiable, tangency forces $\nabla q(x';x')=\nabla f(x')$, so a fixed point of MM is a stationary point of $f$ (global min if $f$ is convex).`,
   R`Maximum-curvature method for a 1-D potential $\rho$: $\rho(\Delta;\Delta')=\rho(\Delta')+\rho'(\Delta')(\Delta-\Delta')+\tfrac{\alpha_2}{2}(\Delta-\Delta')^2$ with $\alpha_2\ge\max\rho''$ over the domain of interest.`,
   R`Symmetric-bound method (for symmetric $\rho$ with $\rho'(\Delta)/\Delta$ non-increasing in $|\Delta|$): $\rho(\Delta;\Delta')=\dfrac{\rho'(\Delta')}{2\Delta'}\Delta^2+c$ for $\Delta'\ne0$, and $\tfrac12\rho''(0)\Delta^2$ at $\Delta'=0$. For $\rho(\Delta)=|\Delta|$: $q=\dfrac{1}{2|x'|}x^2+\dfrac{|x'|}{2}$ (does not exist at $x'=0$).`,
   R`Quadratic $f(x)=\tfrac12\|y-Ax\|^2$: Taylor form $f(x)=\tfrac12(x-x')^tA^tA(x-x')+b^t(x-x')+c$ with $b=A^t(Ax'-y)$; replacing $A^tA$ by $aI$ with $a\ge\lambda_{\max}(A^tA)$ gives a separable surrogate whose minimizer $x'-b/a$ is a gradient-descent step with step size $1/a$.`,
   R`Separable surrogates decouple pixels so each update is a scalar minimization, which is the basis of fast parallel MM algorithms (e.g. for tomography with a huge sparse $B$: $O(NM_o)$ per iteration instead of an $O(N^3)$ solve).`,
   R`Poisson negative log-likelihood $f(\theta)=\theta-y\log\theta$: $f'=1-y/\theta$, $f''=y/\theta^2$, strictly convex for $\theta>0$, ML $\hat\theta=y$; on $\theta\ge1$ the maximum curvature is $y$.`
  ],
  problems:[
   { title:"Surrogates for the log-cosh potential", points:40,
     intro: R`Consider $\rho(\Delta)=\log\cosh(\Delta)$, a smooth approximation to $|\Delta|$, and the 1-D denoising cost $g(x)=\tfrac12(x-y)^2+\beta\sum_{k=1}^{K}\rho(x-x_k)$ with fixed neighbors $x_k$ and $\beta>0$.`,
     parts:[
      {q:R`Compute $\rho'(\Delta)$ and $\rho''(\Delta)$ and show that $\rho$ is convex with curvature bounded by 1.`,
       a:R`$\rho'(\Delta)=\tanh\Delta$ and $\rho''(\Delta)=1-\tanh^2\Delta=\operatorname{sech}^2\Delta\in(0,1]$. Positive second derivative gives convexity; the bound $\rho''\le1$ is attained at $\Delta=0$.`},
      {q:R`Write the maximum-curvature surrogate $\rho_{MC}(\Delta;\Delta')$.`,
       a:R`$\rho_{MC}(\Delta;\Delta')=\log\cosh\Delta'+\tanh(\Delta')(\Delta-\Delta')+\tfrac12(\Delta-\Delta')^2$. It touches $\rho$ at $\Delta'$ and upper-bounds it since its curvature 1 dominates $\rho''$ everywhere.`},
      {q:R`Write the symmetric-bound surrogate $\rho_{SB}(\Delta;\Delta')$ and state the property of $\rho$ that makes it a valid upper bound.`,
       a:R`$\rho_{SB}(\Delta;\Delta')=\dfrac{\tanh\Delta'}{2\Delta'}\Delta^2+c(\Delta')$ with $c$ chosen so the two functions touch at $\Delta'$: $c=\log\cosh\Delta'-\tfrac12\Delta'\tanh\Delta'$. It is valid because $\rho'(\Delta)/\Delta=\tanh\Delta/\Delta$ is even and non-increasing in $|\Delta|$, so the parabola through $(\pm\Delta',\rho(\Delta'))$ with matching slope lies above $\rho$. At $\Delta'=0$ use $\tfrac12\rho''(0)\Delta^2=\tfrac12\Delta^2$.`},
      {q:R`Using the symmetric-bound surrogate for each term, derive the MM update $x\leftarrow\arg\min_x g(x;x')$ in closed form.`,
       a:R`With $w_k=\dfrac{\tanh(x'-x_k)}{x'-x_k}$ (and $w_k=1$ if $x'=x_k$), $g(x;x')=\tfrac12(x-y)^2+\beta\sum_k\tfrac{w_k}{2}(x-x_k)^2+\text{const}$. Setting the derivative to zero: $$x\leftarrow\frac{y+\beta\sum_k w_kx_k}{1+\beta\sum_k w_k}.$$ Each step is a weighted average of the data and the neighbors; neighbors far from $x'$ get small weight, which is the edge-preserving behavior of a robust potential.`},
      {q:R`Prove that the sequence $C_n=g(x^{(n)})$ produced by this MM algorithm converges.`,
       a:R`$C_{n+1}=g(x^{(n+1)})\le g(x^{(n+1)};x^{(n)})\le g(x^{(n)};x^{(n)})=g(x^{(n)})=C_n$, so $C_n$ is non-increasing. Also $g\ge0$. A monotone non-increasing sequence bounded below converges, so $\lim_n C_n$ exists.`},
      {q:R`Sketch $\rho$, $\rho_{MC}(\cdot;2)$ and $\rho_{SB}(\cdot;2)$ on one set of axes and say which surrogate gives the larger step from $x'=2$ toward 0, and why.`,
       a:R`Both parabolas touch $\rho$ at $\Delta'=2$ and lie above it. $\rho_{MC}$ has curvature 1 and its minimum is at $2-\tanh2\approx1.04$. $\rho_{SB}$ has curvature $\tanh(2)/2\approx0.48$ and is centered at 0, so its minimizer is 0. The symmetric-bound surrogate is looser near $\Delta'$ but has smaller curvature, hence takes the larger step; this is its usual advantage for robust potentials.`}
     ]},
   { title:"A separable paraboloidal surrogate for a coupled quadratic", points:35,
     intro: R`Let $f(x)=\tfrac12(y-a^tx)^2$ where $a\in\mathbb R^N$ has $K$ nonzero entries (one row of a tomographic system matrix). The goal is a surrogate that is separable across the $x_i$, so that all pixels can be updated in parallel.`,
     parts:[
      {q:R`Show that $f$ is convex but not strictly convex, and give its Hessian.`,
       a:R`$\nabla f=-(y-a^tx)a$, $\nabla\nabla f=aa^t$, a rank-one positive semidefinite matrix: convex, but flat along every direction orthogonal to $a$, so not strictly convex.`},
      {q:R`Let $\gamma_i\ge0$ with $\sum_{i:a_i\ne0}\gamma_i=1$ and $\gamma_i>0$ whenever $a_i\ne0$. Prove the convexity inequality $$f(x)\le\sum_{i}\gamma_i\,\tfrac12\Big(y-a^tx'-\frac{a_i}{\gamma_i}(x_i-x'_i)\Big)^2\equiv q(x;x').$$ (Hint: write $a^t(x-x')=\sum_i\gamma_i\frac{a_i}{\gamma_i}(x_i-x'_i)$ and use convexity of the square.)`,
       a:R`$y-a^tx=(y-a^tx')-\sum_i\gamma_i\dfrac{a_i}{\gamma_i}(x_i-x'_i)=\sum_i\gamma_i\Big[(y-a^tx')-\dfrac{a_i}{\gamma_i}(x_i-x'_i)\Big]$, a convex combination of the bracketed terms (using $\sum\gamma_i=1$). Since $t\mapsto\tfrac12t^2$ is convex, Jensen's inequality gives $\tfrac12(\sum_i\gamma_iz_i)^2\le\sum_i\gamma_i\tfrac12z_i^2$, which is the claim. Equality holds at $x=x'$ (all $z_i$ equal $y-a^tx'$), so $q$ is a surrogate.`},
      {q:R`Why is $q(x;x')$ called separable, and what is its curvature in coordinate $i$?`,
       a:R`Each term depends on a single $x_i$, so $q$ is a sum of one-variable parabolas. The $i$-th term is $\tfrac{\gamma_i}{2}\big(e-\tfrac{a_i}{\gamma_i}(x_i-x'_i)\big)^2$ with $e=y-a^tx'$, whose curvature is $a_i^2/\gamma_i$.`},
      {q:R`Derive the parallel MM update for all $x_i$ simultaneously.`,
       a:R`Minimizing the $i$-th parabola: $\dfrac{a_i}{\gamma_i}(x_i-x'_i)=e\Rightarrow x_i\leftarrow x'_i+\dfrac{\gamma_i}{a_i}e$ for $a_i\ne0$, and $x_i$ unchanged otherwise. All pixels move at once using the single residual $e=y-a^tx'$.`},
      {q:R`Compare the choices $\gamma_i=1/K$ and $\gamma_i=|a_i|/\|a\|_1$: which gives the smaller curvature (larger steps), and in what sense is this update a form of preconditioned gradient descent?`,
       a:R`Curvatures are $Ka_i^2$ versus $|a_i|\,\|a\|_1$; by Cauchy–Schwarz neither dominates for every $i$, but $\gamma_i\propto|a_i|$ gives the tighter overall bound (it minimizes $\max_i a_i^2/\gamma_i$ subject to $\sum\gamma_i=1$). The update $x_i\leftarrow x'_i+\dfrac{\gamma_i}{a_i}e$ equals $x'-D\nabla f(x')$ with the diagonal preconditioner $D_{ii}=\gamma_i/a_i^2$: MM with separable surrogates is diagonally preconditioned gradient descent with a step size guaranteed to decrease $f$.`},
      {q:R`Extend to $f(x)=\tfrac12\sum_{m=1}^{M}(y_m-a_m^tx)^2$ (many rays). What is the resulting curvature of the separable surrogate in coordinate $i$, and why is this attractive for parallel hardware?`,
       a:R`Sum the per-ray surrogates: curvature $d_i=\sum_m a_{m,i}^2/\gamma_{m,i}$ (for example $\sum_m|a_{m,i}|\,\|a_m\|_1$ with the second choice), and update $x_i\leftarrow x'_i+\dfrac{\sum_ma_{m,i}e_m}{d_i}$ with $e_m=y_m-a_m^tx'$. Every pixel update needs only one back-projection $\sum_ma_{m,i}e_m$ and a precomputed $d_i$; all $N$ updates are independent, which maps directly onto GPUs, unlike sequential ICD.`}
     ]}
  ]
 },
 {
  id:"gmrf", name:"Gaussian MRFs: precision matrix, conditional distributions, causal vs. non-causal prediction", prob:72, trend:"stable",
  years:["2016 P2","2018 P2–P3","2019 P1","2021 Q3","2022 Q2","2025 P1"],
  evidence: R`Six of ten midterms. Two flavors alternate: (i) precision-matrix algebra: write $p(x)$ and $z$ for $X\sim N(0,B^{-1})$, show $B_{r,s}=0$ for non-neighbors, compute $E[X_i|X_j,\,j\ne i]$ and the conditional variance, the pairwise quadratic identity $x^tBx=\sum a_sx_s^2+\sum b_{s,r}|x_s-x_r|^2$; (ii) 1-D AR $\leftrightarrow$ GMRF: power spectrum in causal parameters $(\sigma_c^2,h)$ and non-causal parameters $(\sigma_{NC}^2,g)$, equate them to get $g_n$ and $\sigma^2_{NC}$, decide whether the AR process is an MRF, and fill in the entries of $B$.`,
  concepts:[
   R`GMRF: $p(x)=\frac1z\exp\{-\tfrac12x^tBx\}$ with $z=(2\pi)^{N/2}|B|^{-1/2}$ and precision $B=R^{-1}$. $B_{r,s}=0$ whenever $r\notin\partial s$; conversely $\partial s=\{r\ne s:B_{r,s}\ne0\}$ is a valid neighborhood system.`,
   R`Conditional of one pixel: $p(x_s|x_r,r\ne s)=N\big(\mu_s,\;1/B_{s,s}\big)$ with $\mu_s=-\frac1{B_{s,s}}\sum_{r\ne s}B_{s,r}x_r=\sum_r g_{s,r}x_r$. Hence $g_{s,r}=-B_{s,r}/B_{s,s}$ (non-causal prediction filter) and $\sigma_s^2=1/B_{s,s}$ (non-causal prediction variance); $B=\Gamma^{-1}(I-G)$.`,
   R`Pairwise quadratic identity: $x^tBx=\sum_s a_sx_s^2+\sum_{\{s,r\}}b_{s,r}(x_s-x_r)^2$ with $b_{s,r}=-B_{s,r}$ and $a_s=\sum_rB_{s,r}$ (row sums). If all row sums are zero the prior is improper (constant images have zero energy).`,
   R`Causal 1-D AR: $X_n=\sum_{k\ge1}h_kX_{n-k}+E_n$, $E_n$ white with variance $\sigma_c^2$: $S_X(\omega)=\dfrac{\sigma_c^2}{|1-H(\omega)|^2}$. Non-causal: $S_X(\omega)=\dfrac{\sigma^2_{NC}}{1-G(\omega)}$ with $G$ real and even.`,
   R`Equating: $\sigma_c^2(\delta_n-g_n)=\sigma_{NC}^2(\delta_n-h_n)*(\delta_n-h_{-n})$. Evaluating at $n=0$: $\sigma^2_{NC}=\dfrac{\sigma_c^2}{1+\sum_k h_k^2}$ and $g_n=\delta_n-\dfrac{(\delta_n-h_n)*(\delta_n-h_{-n})}{1+\sum_kh_k^2}$. For AR(1) with $h_1=\rho$: $g_n=\frac{\rho}{1+\rho^2}(\delta_{n-1}+\delta_{n+1})$, $\sigma^2_{NC}=\sigma_c^2/(1+\rho^2)$.`,
   R`An AR process of order $P$ is a 1-D MRF of order $P$ (neighbors within $\pm P$); $B_{i,j}=0$ for $|i-j|>P$. Circulant $B_{i,j}=a_{(i-j)\bmod N}$ is diagonalized by the DFT.`,
   R`Boundary rows of $B$ differ from interior rows: $B=A^t\Lambda^{-1}A$ with $A=I-H$ lower triangular, so the first/last rows only include the causal terms that exist.`
  ],
  problems:[
   { title:"From a second-order AR model to a GMRF", points:35,
     intro: R`Let $X_n$ be a zero-mean stationary Gaussian AR(2) process with MMSE causal predictor $\hat X_n=h_1X_{n-1}+h_2X_{n-2}$ and causal prediction variance $\sigma_c^2$. Let $g_n$ and $\sigma^2_{NC}$ be the non-causal prediction filter and variance.`,
     parts:[
      {q:R`Write $S_X(\omega)$ in terms of the causal parameters, and in terms of the non-causal parameters.`,
       a:R`Causal: $S_X(\omega)=\dfrac{\sigma_c^2}{|1-h_1e^{-j\omega}-h_2e^{-2j\omega}|^2}$. Non-causal: $S_X(\omega)=\dfrac{\sigma^2_{NC}}{1-G(\omega)}$ where $G(\omega)=\sum_ng_ne^{-j\omega n}$ is real and even.`},
      {q:R`Equate the two expressions and convert to the sample domain.`,
       a:R`$\sigma_c^2\,(1-G(\omega))=\sigma^2_{NC}\,|1-H(\omega)|^2$, i.e. $$\sigma_c^2(\delta_n-g_n)=\sigma^2_{NC}\,(\delta_n-h_n)*(\delta_n-h_{-n}).$$`},
      {q:R`Compute the sequence $c_n=(\delta_n-h_n)*(\delta_n-h_{-n})$ for $n=0,\pm1,\pm2$.`,
       a:R`With $\delta_n-h_n=\delta_n-h_1\delta_{n-1}-h_2\delta_{n-2}$: $c_0=1+h_1^2+h_2^2$, $c_{\pm1}=-h_1+h_1h_2$, $c_{\pm2}=-h_2$, and $c_n=0$ for $|n|>2$.`},
      {q:R`Determine $\sigma^2_{NC}$ and $g_n$.`,
       a:R`At $n=0$, $g_0=0$ gives $\sigma_c^2=\sigma^2_{NC}c_0$, so $\sigma^2_{NC}=\dfrac{\sigma_c^2}{1+h_1^2+h_2^2}$. Then $g_n=-c_n/c_0$ for $n\ne0$: $$g_{\pm1}=\frac{h_1(1-h_2)}{1+h_1^2+h_2^2},\qquad g_{\pm2}=\frac{h_2}{1+h_1^2+h_2^2},$$ zero otherwise.`},
      {q:R`Is $X_n$ a Markov random field? Of what order? Which entries of the precision matrix $B$ of $Z=[X_n,\dots,X_{n+p-1}]^t$ are nonzero?`,
       a:R`Yes: any AR($P$) process is a 1-D MRF of order $P$, here $P=2$, with neighborhood $\partial n=\{n\pm1,n\pm2\}$. Hence $B_{i,j}\ne0$ only for $|i-j|\le2$ (a pentadiagonal matrix).`},
      {q:R`Give the values of the interior entries of $B$ (rows away from the two boundaries).`,
       a:R`$B=\Gamma^{-1}(I-G)$ with $\Gamma=\sigma^2_{NC}I$: $B_{i,i}=1/\sigma^2_{NC}=\dfrac{1+h_1^2+h_2^2}{\sigma_c^2}$, $B_{i,i\pm1}=-g_1/\sigma^2_{NC}=\dfrac{-h_1+h_1h_2}{\sigma_c^2}$, $B_{i,i\pm2}=-g_2/\sigma^2_{NC}=\dfrac{-h_2}{\sigma_c^2}$. (Equivalently $B=A^tA/\sigma_c^2$ with $A=I-H$, whose first two rows have fewer terms.)`}
     ]},
   { title:"A homogeneous GMRF on a torus: eigenvalues, partition function and sampling", points:30,
     intro: R`Let $X$ be a zero-mean GMRF on an $N\times N$ periodic lattice (a torus) with $p(x)=\frac1z\exp\{-\tfrac12x^tBx\}$ and $B=\tfrac1{\sigma^2}(I-G)$, where $G$ is periodic convolution with the symmetric non-causal prediction filter $g_{s,r}=g(s-r)$ and $g(0)=0$.`,
     parts:[
      {q:R`Explain why $B$ is diagonalized by the 2-D DFT and give its eigenvalues $\lambda_k$ in terms of $\hat g(k)$, the DFT of $g$.`,
       a:R`Periodic convolution matrices are block-circulant with circulant blocks, and all such matrices share the 2-D DFT vectors as eigenvectors. Hence $\lambda_k=\tfrac1{\sigma^2}(1-\hat g(k))$ for each 2-D frequency $k$; since $g$ is symmetric, $\hat g(k)$ is real.`},
      {q:R`What condition on $g$ makes $B$ positive definite? Check it for the 4-neighbor filter $g=\tfrac14$ on the four nearest neighbors.`,
       a:R`Need $\hat g(k)&lt;1$ for all $k$. For the 4-neighbor filter $\hat g(k_1,k_2)=\tfrac12\big(\cos\tfrac{2\pi k_1}N+\cos\tfrac{2\pi k_2}N\big)$, which equals 1 at $k=0$: $B$ is only positive semidefinite (the constant image is in its null space), so the prior is improper. Scaling $g$ by $\rho&lt;1$ fixes it.`},
      {q:R`Assuming $B\succ0$, write the partition function $z$ and $\log z$ in terms of the $\lambda_k$.`,
       a:R`$z=(2\pi)^{N^2/2}|B|^{-1/2}=(2\pi)^{N^2/2}\prod_k\lambda_k^{-1/2}$, so $\log z=\tfrac{N^2}2\log(2\pi)-\tfrac12\sum_k\log\lambda_k$: computable in $O(N^2\log N)$ although $B$ has $N^4$ entries.`},
      {q:R`Give the conditional distribution of one pixel given all others, and the power spectrum $S_X(k)$ of the field.`,
       a:R`$X_s|X_{r\ne s}\sim N\big(\sum_rg(s-r)X_r,\;\sigma^2\big)$. The covariance is $B^{-1}$ with eigenvalues $1/\lambda_k$, so $S_X(k)=\dfrac{\sigma^2}{1-\hat g(k)}$: the non-causal spectral formula.`},
      {q:R`Describe an $O(N^2\log N)$ algorithm to draw an exact sample of $X$.`,
       a:R`Draw i.i.d. $N(0,1)$ values $W_k$ for each frequency (with the conjugate symmetry needed for a real image), set $\hat X_k=W_k/\sqrt{\lambda_k}=W_k\sqrt{S_X(k)}$, and take the inverse 2-D FFT. Since $B^{-1}=F^{-1}\mathrm{diag}(1/\lambda_k)F$, the result has covariance $B^{-1}$; this is whitening run backwards.`},
      {q:R`Why does this convenient structure disappear for a real (non-periodic) image, and what changes in $B$?`,
       a:R`Without periodicity the boundary rows of $B$ have fewer neighbors, so $B$ is Toeplitz-block-Toeplitz rather than circulant and the DFT no longer diagonalizes it exactly; the interior rows are unchanged but the corners differ, and exact sampling or $\log z$ then require a Cholesky factorization or iterative solvers.`}
     ]}
  ]
 },
 {
  id:"ml", name:"Maximum-likelihood estimation and sufficient statistics", prob:50, trend:"stable",
  years:["2016 P1","2017 P1","2018 P1a","2020 Q2.2","2023 P3e"],
  evidence: R`A full ML problem appeared in 2016 (multinomial via Lagrange multipliers) and 2017 (Gaussian mean and covariance via trace identities); ML appears as a sub-part in 2018, 2020 and 2023 (Poisson). It is also a staple of the final. Know the multinomial, Gaussian and Poisson/exponential ML estimates cold and be able to derive them.`,
  concepts:[
   R`$\hat\theta=\arg\max_\theta\log p_\theta(y)$; bias $=E_\theta[\hat\theta]-\theta$, MSE $=$ variance $+$ bias$^2$.`,
   R`Multinomial $P\{X_n=k\}=\pi_k$: with counts $N_k$, minimize $-\sum_kN_k\log\pi_k$ subject to $\sum_k\pi_k=1$ using a Lagrange multiplier: $\hat\pi_k=N_k/N$.`,
   R`i.i.d. Gaussian vectors $N(\mu,R)$: sufficient statistics $b=\sum_kX_k$, $S=\sum_kX_kX_k^t$; $\hat\mu=b/n$, $\hat R=S/n-\hat\mu\hat\mu^t$. Matrix identities: $\partial|A|/\partial A=|A|A^{-t}$ (symmetric case: $|A|A^{-1}$), $\partial\,\mathrm{tr}(BA)/\partial A=B^t$, $\mathrm{tr}(AB)=\mathrm{tr}(BA)$.`,
   R`Poisson $Y\sim\mathrm{Pois}(\theta)$: $-\log p_\theta(y)=\theta-y\log\theta+\log y!$; $\hat\theta=\bar y$; exponential with mean $\mu$: $\hat\mu=\bar y$.`,
   R`Exponential family $p_\theta(x)=\exp\{\langle\eta(\theta),T(x)\rangle+d(\theta)+s(x)\}$: $T$ are the natural sufficient statistics and the ML estimate is a function of $T$ alone.`,
   R`ML has (asymptotically) low bias but can have high variance; it needs no prior; it is the $\beta\to0$ limit of MAP.`
  ],
  problems:[
   { title:"ML estimation for a Rayleigh model", points:30,
     intro: R`Speckle magnitudes $Y_1,\dots,Y_N$ are i.i.d. Rayleigh with density $p_\theta(y)=\dfrac{y}{\theta}\exp\Big\{-\dfrac{y^2}{2\theta}\Big\}u(y)$, $\theta>0$. (For this family $E[Y^2]=2\theta$ and $\mathrm{Var}(Y^2)=4\theta^2$.)`,
     parts:[
      {q:R`Write the negative log-likelihood $l(\theta)$ and identify the natural sufficient statistic.`,
       a:R`$l(\theta)=N\log\theta+\dfrac1{2\theta}\sum_ny_n^2-\sum_n\log y_n$. Writing $p_\theta(y)=\exp\{-\tfrac1{2\theta}T-N\log\theta+\sum\log y_n\}$ with $T=\sum_ny_n^2$ shows an exponential family with $\eta=-1/(2\theta)$ and natural sufficient statistic $T$.`},
      {q:R`Derive $\hat\theta$ and verify it is the unique minimizer of $l$.`,
       a:R`$l'(\theta)=N/\theta-T/(2\theta^2)=0\Rightarrow\hat\theta=\dfrac{T}{2N}=\dfrac1{2N}\sum_ny_n^2$. $l''(\hat\theta)=-N/\hat\theta^2+T/\hat\theta^3=N/\hat\theta^2>0$ and $l\to\infty$ at both ends, so it is the unique minimizer.`},
      {q:R`Compute the bias and variance of $\hat\theta$.`,
       a:R`$E[\hat\theta]=\tfrac1{2N}\cdot N\cdot2\theta=\theta$: unbiased. $\mathrm{Var}(\hat\theta)=\tfrac1{4N^2}\cdot N\cdot4\theta^2=\theta^2/N$.`},
      {q:R`Suppose instead you only observe $Z_n=\delta(Y_n>c)$ for a known threshold $c$. Derive the ML estimate of $\theta$ from $Z_1,\dots,Z_N$.`,
       a:R`$P\{Y>c\}=e^{-c^2/2\theta}=:q$. With $K=\sum_nZ_n$, the likelihood is binomial and $\hat q=K/N$; by invariance of ML, $\hat\theta=-\dfrac{c^2}{2\ln(K/N)}$ (undefined if $K=0$ or $K=N$). Thresholding discards information, so this estimate has larger variance than part b).`},
      {q:R`In one sentence each: what is the advantage of the ML estimate here, and when would you prefer a MAP estimate of $\theta$?`,
       a:R`ML needs no prior and is unbiased with variance $\theta^2/N$ shrinking with data. With very few samples (small $N$) or a known typical range of $\theta$, a prior on $\theta$ (MAP) trades a little bias for a large variance reduction.`}
     ]},
   { title:"ML estimation of Markov chain transition probabilities", points:30,
     intro: R`A homogeneous Markov chain $X_0,\dots,X_N$ on states $\{0,\dots,M-1\}$ has unknown transition matrix $P$ (rows sum to 1) and known initial state. Define the transition counts $N_{i,j}=\sum_{n=1}^N\delta(X_{n-1}=i)\delta(X_n=j)$ and $N_i=\sum_jN_{i,j}$.`,
     parts:[
      {q:R`Write $p_P(x_1,\dots,x_N|x_0)$ in terms of the counts, and show it is an exponential family.`,
       a:R`$p_P(x|x_0)=\prod_{n=1}^NP_{x_{n-1},x_n}=\prod_{i,j}P_{i,j}^{N_{i,j}}=\exp\Big\{\sum_{i,j}N_{i,j}\log P_{i,j}\Big\}$: natural parameters $\log P_{i,j}$, natural sufficient statistics $N_{i,j}$.`},
      {q:R`Derive the ML estimate of $P$ using one Lagrange multiplier per row.`,
       a:R`Maximize $\sum_{i,j}N_{i,j}\log P_{i,j}+\sum_i\lambda_i(\sum_jP_{i,j}-1)$: $N_{i,j}/P_{i,j}+\lambda_i=0\Rightarrow P_{i,j}=-N_{i,j}/\lambda_i$; the row constraint gives $-\lambda_i=N_i$, so $\hat P_{i,j}=N_{i,j}/N_i$ (empirical transition frequencies).`},
      {q:R`Is the negative log-likelihood strictly convex in the entries of $P$ (when all $N_{i,j}>0$)? Is the ML estimate unique?`,
       a:R`Each term $-N_{i,j}\log P_{i,j}$ has second derivative $N_{i,j}/P_{i,j}^2>0$, so the NLL is strictly convex on the product of open simplices (one per row), and the constraint set is convex: the ML estimate is unique.`},
      {q:R`The chain is known to be reversible with uniform stationary distribution (so $P$ is symmetric). Derive the ML estimate under this constraint.`,
       a:R`Now $P_{i,j}=P_{j,i}$ pools the counts: the likelihood becomes $\prod_{i\le j}P_{i,j}^{N_{i,j}+N_{j,i}}$ (with $N_{i,i}$ counted once). Maximizing subject to each row summing to 1 no longer decouples across rows; the estimate is obtained by iterative proportional fitting, but the natural approximation is $\hat P_{i,j}\propto(N_{i,j}+N_{j,i})$ renormalized. The key point: adding a structural constraint reduces the number of free parameters from $M(M-1)$ to $M(M-1)/2$ and lowers the variance of the estimate.`},
      {q:R`How would you estimate the stationary distribution $\pi$ from the same data, and when is $\hat\pi$ consistent?`,
       a:R`Either the empirical state frequencies $\hat\pi_i=\tfrac1{N+1}\sum_n\delta(X_n=i)$, or the solution of $\hat\pi^t\hat P=\hat\pi^t$. Both converge to $\pi$ as $N\to\infty$ if the chain is ergodic (irreducible and aperiodic), since time averages then equal ensemble averages.`}
     ]}
  ]
 },
 {
  id:"convex", name:"Convexity, existence and uniqueness of the MAP estimate", prob:30, trend:"stable",
  years:["2019 P3","2024 P3a–b"],
  evidence: R`A full proof problem in 2019 (closed and compact sublevel sets, existence, uniqueness by strict convexity) and a proof-outline sub-problem in 2024 for proximal maps. The fact sheet lists the definitions (closed, bounded, compact, closed functions, lower semicontinuity), which is a hint that these proofs are fair game.`,
  concepts:[
   R`Compact $=$ closed and bounded (in $\mathbb R^N$). A continuous function on a non-empty compact set attains its minimum.`,
   R`Sublevel set $A_\alpha=\{x:f(x)\le\alpha\}=f^{-1}((-\infty,\alpha])$ is closed when $f$ is continuous (inverse image of a closed set). Convex functions on $\mathbb R^N$ are continuous.`,
   R`Boundedness of $A_\alpha$ (coercivity): show $f(x)\ge c\,(\beta_{\min}\|x\|-\|y\|)^2$ using $\|y-Ax\|\ge\|Ax\|-\|y\|\ge\beta_{\min}\|x\|-\|y\|$ with $\beta_{\min}>0$ the smallest singular value of $A$.`,
   R`Existence: minimizer over the compact $A_\alpha$ is a global minimizer over $\mathbb R^N$. Uniqueness: strictly convex $f$ (strictly convex $+$ convex $=$ strictly convex); if two minimizers existed their midpoint would have strictly lower cost.`,
   R`Proper, closed, convex functions taking value $+\infty$ (indicator functions) need lower semicontinuity instead of continuity.`
  ],
  problems:[
   { title:"Existence without strict convexity: an L1-regularized cost", points:32,
     intro: R`Let $f(x)=\tfrac12\|y-Ax\|_\Lambda^2+\beta\|Dx\|_1$ with $A\in\mathbb R^{M\times N}$, $\Lambda\succ0$, $\beta>0$, and $D\in\mathbb R^{P\times N}$ a finite-difference matrix. Assume $\mathcal N(A)\cap\mathcal N(D)=\{0\}$. You may use: (T1) compact $\iff$ closed and bounded; (T2) inverse images of closed sets under continuous maps are closed; (T3) continuous functions attain their minimum on non-empty compact sets; (T4) all norms on $\mathbb R^N$ are equivalent.`,
     parts:[
      {q:R`Show that $\|x\|_\ast=\|Ax\|+\|Dx\|_1$ is a norm on $\mathbb R^N$.`,
       a:R`Non-negativity, homogeneity and the triangle inequality are inherited from $\|\cdot\|$ and $\|\cdot\|_1$. Definiteness: $\|x\|_\ast=0\Rightarrow Ax=0$ and $Dx=0\Rightarrow x\in\mathcal N(A)\cap\mathcal N(D)=\{0\}$.`},
      {q:R`Prove that $f$ is coercive: $f(x)\to\infty$ as $\|x\|\to\infty$.`,
       a:R`$f(x)\ge\tfrac{\lambda_{\min}}2(\|Ax\|-\|y\|)^2+\beta\|Dx\|_1$. By (T4) there is $c>0$ with $\|x\|_\ast\ge c\|x\|$, so at least one of $\|Ax\|$, $\|Dx\|_1$ is $\ge\tfrac c2\|x\|$; either way $f(x)\ge\min\{\tfrac{\lambda_{\min}}2(\tfrac c2\|x\|-\|y\|)^2,\ \beta\tfrac c2\|x\|\}\to\infty$.`},
      {q:R`Prove that a minimizer exists.`,
       a:R`$f$ is convex, hence continuous; its sublevel sets $A_\alpha=f^{-1}((-\infty,\alpha])$ are closed (T2) and, by coercivity, bounded, hence compact (T1). Take $\alpha=f(0)$ so $A_\alpha\ne\emptyset$; $f$ attains its minimum on $A_\alpha$ (T3), and that minimizer is global since $f>\alpha$ outside $A_\alpha$.`},
      {q:R`Show that the set of minimizers is convex, and give an example (with specific $A$, $D$) where it contains more than one point.`,
       a:R`If $x_1,x_2$ are minimizers with value $f^\ast$, convexity gives $f(\lambda x_1+(1-\lambda)x_2)\le f^\ast$, so the combination is also a minimizer. Example: $N=2$, $A=[1\;1]$, $D=[1\;-1]$, $\Lambda=1$, $y=2$, $\beta$ large. The data term wants $x_1+x_2=2$ and the $\ell_1$ term wants $x_1=x_2$: the unique minimizer is $(1,1)$. Now take instead $D=0$ and $A=[1\;1]$ (so $\mathcal N(A)\cap\mathcal N(D)\ne\{0\}$ and the hypothesis fails): every $x$ with $x_1+x_2=2$ is a minimizer, a whole line. Non-uniqueness arises exactly when the data and prior terms share a flat direction.`},
      {q:R`Add the term $\tfrac\epsilon2\|x\|^2$ with $\epsilon>0$. What changes about existence and uniqueness, and about the hypothesis needed?`,
       a:R`The cost becomes strictly convex (the quadratic has Hessian $\epsilon I\succ0$) and coercive for any $A$, $D$, so a unique minimizer exists without the null-space hypothesis. This is why a small Tikhonov term is often added to ill-posed problems.`}
     ]}
  ]
 },
 {
  id:"gibbs", name:"Gibbs distributions, partition functions and MMSE vs. MAP", prob:22, trend:"falling",
  years:["2017 P3","2018 P1"],
  evidence: R`The partition-function scaling proof $z(\sigma)=z_0\sigma^N$ appeared in 2017, and the conditional density / MMSE derivation for $Y=X+W$ in 2018. These have not recurred on the midterm since, but the ideas (MMSE $=$ MAP for Gaussians, ML of the scale parameter of a prior) reappear inside PnP questions.`,
  concepts:[
   R`Gibbs distribution $p(x)=\frac1z\exp\{-u(x)\}$; the partition function $z=\int e^{-u(x)}dx$ generally cannot be computed, but its dependence on a scale parameter can: with $u(x/\sigma)$, substituting $x=\sigma v$ gives $z(\sigma)=\sigma^Nz_0$.`,
   R`ML estimation of $\sigma$ for the prior is therefore possible: $-\log p(x|\sigma)=\sum b_{s,r}\rho((x_s-x_r)/\sigma)+N\log\sigma+\log z_0$.`,
   R`Jointly Gaussian $X,W$ with $Y=X+W$: $E[X|Y]=R_x(R_x+R_w)^{-1}Y$ and $\mathrm{Cov}(X|Y)=R_x-R_x(R_x+R_w)^{-1}R_x$; the MMSE estimator is linear and equals the MAP estimate.`,
   R`For non-Gaussian priors (Laplacian, generalized Gaussian) the posterior is not symmetric, so MMSE $\ne$ MAP in general; MAP is what optimization computes, MMSE is what a trained denoiser approximates.`
  ],
  problems:[
   { title:"Scale parameter of a Gibbs prior and Gaussian conditioning", points:30,
     intro: R`Let $p(x|\sigma)=\dfrac1{z(\sigma)}\exp\Big\{-\sum_{\{s,r\}\in\mathcal P}b_{s,r}\,\rho\big(\tfrac{x_s-x_r}{\sigma}\big)\Big\}$ for $x\in\mathbb R^N$, and separately let $Y=X+W$ with independent $X\sim N(0,R_x)$, $W\sim N(0,R_w)$.`,
     parts:[
      {q:R`Prove that $z(\sigma)=\sigma^Nz_0$ where $z_0=\int\exp\{-\sum b_{s,r}\rho(x_s-x_r)\}dx$.`,
       a:R`Substitute $x=\sigma v$, $dx=\sigma^Ndv$: $z(\sigma)=\int\exp\{-\sum b_{s,r}\rho(v_s-v_r)\}\sigma^Ndv=\sigma^Nz_0$.`},
      {q:R`Write $-\log p(x|\sigma)$ and, for $\rho(\Delta)=\tfrac12\Delta^2$, derive the ML estimate of $\sigma^2$ from a single sample image $x$.`,
       a:R`$-\log p(x|\sigma)=\sum b_{s,r}\rho((x_s-x_r)/\sigma)+N\log\sigma+\log z_0$. With $\rho=\tfrac12\Delta^2$: $l(\sigma)=\tfrac1{2\sigma^2}\sum b_{s,r}(x_s-x_r)^2+N\log\sigma+c$. Setting $dl/d\sigma=-\sigma^{-3}\sum b(x_s-x_r)^2+N/\sigma=0$ gives $\hat\sigma^2=\tfrac1N\sum_{\{s,r\}}b_{s,r}(x_s-x_r)^2$.`},
      {q:R`Derive $p(x|y)$ for the Gaussian model and give the MMSE estimate and the conditional covariance.`,
       a:R`$(X,Y)$ is jointly Gaussian with $\mathrm{Cov}(Y)=R_x+R_w$ and $\mathrm{Cov}(X,Y)=R_x$. Hence $X|Y=y\sim N\big(R_x(R_x+R_w)^{-1}y,\;R_x-R_x(R_x+R_w)^{-1}R_x\big)$; the MMSE estimate is the conditional mean $R_x(R_x+R_w)^{-1}y$.`},
      {q:R`Show that this equals the MAP estimate, and explain why the equality fails if instead $X$ has the Laplacian prior of part a) with $\rho(\Delta)=|\Delta|$.`,
       a:R`The posterior is Gaussian: mean $=$ mode, so MMSE $=$ MAP. (Equivalently, minimizing $\tfrac12(y-x)^tR_w^{-1}(y-x)+\tfrac12x^tR_x^{-1}x$ gives $(R_w^{-1}+R_x^{-1})^{-1}R_w^{-1}y$, which equals $R_x(R_x+R_w)^{-1}y$.) With a Laplacian prior the posterior is not Gaussian and generally not symmetric about its mode; its mean and mode differ, so the MAP estimate (a shrinkage/TV solution with exact zeros) and the MMSE estimate (a smooth average) are different.`}
     ]}
  ]
 },
 {
  id:"words", name:"Explain-in-words / \"emotional equations\" questions", prob:25, trend:"rising",
  years:["2020 Q5","2021 Q4 (bonus)","2023 P1","2025 P2c"],
  evidence: R`Since 2023 the exam opens with a short prose question worth up to 22 points ("write 50 words describing your feelings and interpretation of this equation"), and 2025 asked to explain the shrinkage operator "emotionally". These test whether you can say what an equation means without symbols.`,
  concepts:[
   R`Proximal map: "move toward the minimizer of $f$ but stay near $z$; the trade-off is set by $\sigma^2$."`,
   R`MAP estimate: "the image that best explains the data while staying plausible under the prior; the log-likelihood and log-prior are added."`,
   R`Surrogate function: "an easier function that touches the true cost at the current point and lies above it everywhere; minimizing it can never increase the cost."`,
   R`Shrinkage: "kill small coefficients, keep big ones but pull them toward zero."`,
   R`PnP equilibrium: "two agents, one that fits the data and one that denoises, each pulling with equal and opposite offsets $u^\ast$ until they agree on $x^\ast$."`,
   R`Detailed balance: "probability flow from $i$ to $j$ equals the flow from $j$ to $i$; the chain looks the same run backwards."`
  ],
  problems:[
   { title:"Interpret the equation in prose (60 words or fewer each)", points:20,
     intro: R`For each equation, write a short paragraph explaining what it means and why it matters.`,
     parts:[
      {q:R`$\hat x=\arg\min_x\{-\log p(y|x)-\log p(x)\}$`,
       a:R`This is the MAP estimate. The first term rewards images that explain the measurements; the second rewards images that are plausible a priori. Adding the two negative log-probabilities and minimizing finds the single most probable image given the data, trading fidelity against regularity. It is the workhorse of model-based reconstruction.`},
      {q:R`$f(x)\le q(x;x')$ for all $x$, with $f(x')=q(x';x')$`,
       a:R`$q$ is a surrogate (majorizer) of $f$ anchored at the current point $x'$. It hugs $f$ from above and touches it at $x'$, so pushing $q$ down cannot push $f$ up. Replacing a hard $f$ by an easy $q$ at each step is the majorization–minimization idea behind EM, ICD with robust priors, and many fast solvers.`},
      {q:R`$S_\lambda(y)=\operatorname{sign}(y)\max(|y|-\lambda,0)$`,
       a:R`The soft threshold: anything smaller than $\lambda$ in magnitude is declared noise and set to zero; anything larger is kept but pulled toward zero by $\lambda$. It is the exact proximal map of the $\ell_1$ norm, the reason sparse solutions have exact zeros, and the one-line denoiser inside ISTA and ADMM.`},
      {q:R`$x^\ast=F(x^\ast-u^\ast),\quad x^\ast=H(x^\ast+u^\ast)$`,
       a:R`The plug-and-play equilibrium. Two agents, a data-fitting proximal map $F$ and a denoiser $H$, each receive the consensus image nudged by an offset $u^\ast$ in opposite directions and both return the same $x^\ast$. The offset is the "noise" the denoiser removes and the data term restores; when they balance, the reconstruction is done.`}
     ]}
  ]
 }
 ]
};
})();
