window.EXAMDB = window.EXAMDB || {};
(function(){
const R = String.raw;
const C = window.EXAMDB.ece60146 = window.EXAMDB.ece60146 || {id:"ece60146", code:"ECE 60146 / BME 64600", title:"Deep Learning", exams:{}};
C.exams.mt1 = {
 id:"mt1", name:"Midterm 1", years:"Spring 2020 – Spring 2026 (7 exams; all that exist)",
 format:"5 problems (about 32 five-point sub-parts), 75 min, closed book, closed notes",
 mockCount:5, mockTime:"75 minutes",
 notes: R`<b>What the seven Midterm 1s look like.</b> Midterm 1 is mathematical foundations: convexity and optimization (6 of 7 exams), CNN tensor shapes and parameter counting (5 of 7), gradients of loss functions and convolution blocks as matrices with their adjoints (4 of 7), gradient descent conditioning and preconditioning (4 of 7), maximum likelihood / one-hot / softmax / cross-entropy (4 of 7), and since 2024 an opening problem on probability and random variables (what is a random variable, is $E[X|Y]$ random, $E[E[Y|X]]$, the MMSE estimator). Recent exams reuse sub-questions almost verbatim from prior years, so the past exams are the best predictor.`,
 categories:[
 {
  id:"convex", name:"Convexity and optimization: convex/concave, local vs. global minima, saddle points, proofs", prob:90, trend:"stable",
  years:["2020 P1–P2","2021 Q2–Q4","2022 Q2","2023 P1","2025 P2","2026 P2"],
  evidence: R`Six of seven exams. Formats: check-box classification of functions ($e^{-x}$, $x$, $x^2$, $x^3$, $|x|$, $|x|^3$, sums of squares, $-|x|$, $-x$), true/false/undecidable statements about minima, and prove-or-counterexample questions (continuous on $[0,1]^N$ attains a min; convex on $\mathbb R^N$ need not; convex local min is global but not unique; $(x-1)^2(x+1)^2$ is not convex and has two global minima; $x^2-y^2$ has a saddle at the origin).`,
  concepts:[
   R`Convex: $f(\lambda a+(1-\lambda)b)\le\lambda f(a)+(1-\lambda)f(b)$; strictly convex with $&lt;$ for $a\ne b$, $\lambda\in(0,1)$. Concave: $-f$ convex. Linear functions are both convex and concave (neither strictly). For $C^2$: convex $\iff\nabla^2f\succeq0$ everywhere; $\nabla^2f\succ0$ suffices for strict convexity.`,
   R`Operations preserving convexity: nonnegative sums, composition with an affine map $f(Ax+b)$, pointwise max, $\|\cdot\|$ of an affine map. Products of convex functions need not be convex ($x\cdot x^2=x^3$).`,
   R`Continuous $f$ on a compact (closed, bounded) set attains its min and max. Convex $f$ on $\mathbb R^N$ need not attain a minimum ($e^{-x}$, $Ax+b$). Local min of a convex function is global; it need not be unique (constant function). Strictly convex: at most one minimizer.`,
   R`Zero gradient is necessary at an interior minimum but not sufficient (inflection $x^3$, saddle $x^2-y^2$, local max). For convex differentiable $f$, $\nabla f(x^\ast)=0\iff x^\ast$ is a global minimum. Saddle: $\nabla f=0$ with Hessian having eigenvalues of both signs.`,
   R`Classification examples: $e^{-x}$ convex; $x^2$, $|x|$, $|x|^3$, softplus $\log(1+e^x)$, $\mathrm{ReLU}=\max(0,x)$ (not strictly) convex; $x^3$ neither; $-|x|$ concave; $x^2+y^2$ convex; $x^2-y^2$ neither; $xy$ neither.`
  ],
  problems:[
   { title:"Classify the functions", points:30,
     intro: R`For each function state whether it is convex, strictly convex, concave, strictly concave, both (linear) or neither, on the given domain, and justify in one line.`,
     parts:[
      {q:R`$f(x)=e^{x}$ on $\mathbb R$; $g(x)=-\log x$ on $x>0$; $h(x)=x\log x$ on $x>0$.`,
       a:R`All three strictly convex: $f''=e^x>0$, $g''=1/x^2>0$, $h''=1/x>0$.`},
      {q:R`$f(x)=\max(0,x)$ (ReLU); $g(x)=\log(1+e^x)$ (softplus); $h(x)=|x|+x^2$.`,
       a:R`ReLU: convex (max of two linear functions) but not strictly (linear on each half-line). Softplus: strictly convex, $g''=\sigma(x)(1-\sigma(x))>0$. $h$: strictly convex (convex $|x|$ plus strictly convex $x^2$).`},
      {q:R`$f(x)=x^3$; $g(x)=\sin x$; $h(x)=-x$.`,
       a:R`$x^3$: neither ($f''=6x$ changes sign). $\sin x$: neither on $\mathbb R$ (curvature changes sign). $-x$: both convex and concave (linear), neither strictly.`},
      {q:R`$f(x,y)=x^2+y^2$; $g(x,y)=x^2-y^2$; $h(x,y)=xy$; $k(x,y)=\|(x,y)\|_1$.`,
       a:R`$f$: strictly convex (Hessian $2I$). $g$: neither (eigenvalues $2,-2$; saddle at 0). $h$: neither (Hessian $\begin{bmatrix}0&1\\1&0\end{bmatrix}$ has eigenvalues $\pm1$). $k=|x|+|y|$: convex (norm), not strictly.`},
      {q:R`$f(x)=\sum_{k=0}^{K}\big[a_ke^{-x}+b_kx+c_k(x-\mu_k)^2\big]$ with $a_k,b_k,c_k\ge0$.`,
       a:R`Convex: a nonnegative combination of convex functions ($e^{-x}$ convex, $x$ linear, $(x-\mu_k)^2$ convex). Strictly convex if any $a_k>0$ or $c_k>0$.`},
      {q:R`$f(x)=(x-1)^2(x+1)^2$: convex? local minima? global minima? unique? saddle point?`,
       a:R`Not convex: $f(1)=f(-1)=0$ but $f(0)=1>\tfrac12f(1)+\tfrac12f(-1)$. Local (and global, since $f\ge0$) minima at $x=\pm1$; not unique. $x=0$ has $f'=0$ but $f''(0)=-4&lt;0$: a local maximum, not a saddle (in 1-D a saddle would need $f''=0$ with a sign change of $f'$ absent, like $x^3$).`}
     ]},
   { title:"True, false or undecidable", points:30,
     intro: R`Label each statement T (true), F (false) or U (undecidable from the information given), with a one-line justification or counterexample. $f:\mathbb R^N\to\mathbb R$ unless stated.`,
     parts:[
      {q:R`If $x^\ast$ is a global minimum of $f$, then $x^\ast$ is a local minimum of $f$.`,
       a:R`T: global minimality implies minimality in every neighborhood.`},
      {q:R`If $f$ is continuously differentiable and $\nabla f(x^\ast)=0$, then $x^\ast$ is a local minimum.`,
       a:R`F: $f(x)=x^3$ at 0 (inflection) or $f=x^2-y^2$ at 0 (saddle) or $f=-x^2$ (maximum).`},
      {q:R`If $f$ is convex and continuously differentiable and $\nabla f(x^\ast)=0$, then $x^\ast$ is a global minimum.`,
       a:R`T: for convex $f$, $f(x)\ge f(x^\ast)+\nabla f(x^\ast)^t(x-x^\ast)=f(x^\ast)$.`},
      {q:R`If $f$ is strictly convex on $\mathbb R^N$ then it has a unique global minimum.`,
       a:R`F: $e^{x}$ is strictly convex but has no minimum. (Strict convexity gives at most one minimizer, not existence.)`},
      {q:R`If $f$ is continuous on $[0,1]^N$ then it attains a global minimum there.`,
       a:R`T: $[0,1]^N$ is compact (closed and bounded) and continuous functions attain extrema on compact sets.`},
      {q:R`If $f$ and $g$ are convex then $fg$ is convex.`,
       a:R`F: $f(x)=x$, $g(x)=x^2$ gives $x^3$. (Nonnegative sums and pointwise maxima do preserve convexity.)`},
      {q:R`$f$ is convex; a gradient-descent iterate has $\|\nabla f\|&lt;10^{-6}$. Then it is within $10^{-6}$ of a global minimizer.`,
       a:R`U (in general F): a small gradient does not bound the distance to the minimizer unless $f$ is strongly convex; for a very flat convex function the minimizer can be far away or not exist.`},
      {q:R`Gradient descent on a non-convex loss always converges to a global minimum if the step size is small enough.`,
       a:R`F: it converges (at best) to a stationary point, which may be a local minimum or saddle, e.g. $\mathrm{loss}(w)=(1-w^2)^2$ starting at $w>0$ reaches $w=1$, never $w=-1$.`}
     ]}
  ]
 },
 {
  id:"prob", name:"Probability and random variables: conditional expectation, MMSE estimator, independence, bias", prob:85, trend:"rising",
  years:["2024 P5","2025 P1","2026 P1"],
  evidence: R`The opening problem of the last three exams, worth 25–40 points, with nearly identical sub-questions: what does $\{X\le\lambda\}$ mean; is $X$ random, is $E[X]$ a number, is $E[X|Y]$ a random variable; $E[X|X]$, $E[E[Y|X]]$, $E[ZX|Z]$, $E[Y|Z]$ for independent $Y,Z$; does $E[f(X)]$ always exist; the function $T^\ast(Y)$ minimizing $E[(X-T(Y))^2]$ is $E[X|Y]$ (the MMSE estimator); independence of events on $\Omega=[0,1]$; bias of an estimator; cross-entropy minimization is ML.`,
  concepts:[
   R`A random variable is a measurable function $X:\Omega\to\mathbb R$ on $(\Omega,\mathcal B,P)$; $\{X\le\lambda\}$ is the event $\{\omega:X(\omega)\le\lambda\}$ and $P\{X\le\lambda\}=P(\{\omega:X(\omega)\le\lambda\})$. $f(X)$ is again a random variable.`,
   R`$E[X]$ is a number. $E[X|Y]=g(Y)$ is a random variable (a function of $Y$). $E[X|X]=X$; tower property $E[E[Y|X]]=E[Y]$; $E[ZX|Z]=ZE[X|Z]$ (pull out what is known); $E[Y|Z]=E[Y]$ if independent; $E[YZ]=E[Y]E[Z]$ if independent.`,
   R`MMSE: $T^\ast(Y)=E[X|Y]$ minimizes $E[(X-T(Y))^2]$ over all measurable $T$ (orthogonality: $E[(X-E[X|Y])h(Y)]=0$).`,
   R`$E[f(X)]$ need not exist: heavy tails ($p(z)\propto(1+|z|)^{-3}$ with $f=x^3$ gives $\infty-\infty$).`,
   R`Events $A,B$ independent iff $P(A\cap B)=P(A)P(B)$; disjoint events with positive probability are never independent. Bias $=E[\hat\theta|\theta]-\theta$; variance of the sample mean $\sigma^2/N$.`
  ],
  problems:[
   { title:"Random variables, conditional expectation and the MMSE estimator", points:40,
     intro: R`Let $(\Omega,\mathcal B,P)$ with $\Omega=[0,1]^2$ and $P(A)=\text{area}(A)$ (uniform on the unit square). Let $X,Y,Z$ be integrable random variables and $f$ a continuous function.`,
     parts:[
      {q:R`Let $A=\{\omega:\omega_1\le\tfrac12\}$, $B=\{\omega:\omega_2\le\tfrac13\}$ and $C=\{\omega:\omega_1+\omega_2\le1\}$. Compute $P(A),P(B),P(C)$ and decide which pairs are independent.`,
       a:R`$P(A)=\tfrac12$, $P(B)=\tfrac13$, $P(C)=\tfrac12$ (a triangle). $P(A\cap B)=\tfrac16=P(A)P(B)$: independent. $A\cap C$ is a trapezoid of area $\int_0^{1/2}(1-\omega_1)d\omega_1=\tfrac38\ne\tfrac14$: $A,C$ dependent. $B\cap C$: area $\int_0^{1/3}(1-\omega_2)d\omega_2=\tfrac5{18}\ne\tfrac16$: dependent.`},
      {q:R`Define $X(\omega)=\omega_1$ and $Y(\omega)=\omega_1+\omega_2$. Is $X$ random? What kind of object is $\{Y\le1\}$? Compute $P\{Y\le1\}$.`,
       a:R`$X$ is a deterministic function $\Omega\to\mathbb R$; randomness comes only from $\omega$. $\{Y\le1\}=\{\omega:\omega_1+\omega_2\le1\}$ is an event (a subset of $\Omega$), the set $C$ above, so $P\{Y\le1\}=\tfrac12$.`},
      {q:R`For $X,Y$ of part b), compute $E[X|Y]$ and verify the tower property $E[E[X|Y]]=E[X]$.`,
       a:R`Given $Y=y$, $(\omega_1,\omega_2)$ is uniform on the segment $\omega_1+\omega_2=y$ inside the square, which is symmetric under $\omega_1\leftrightarrow\omega_2$; hence $E[X|Y]=E[\omega_1|Y]=Y/2$, a random variable. $E[Y/2]=\tfrac12(E\omega_1+E\omega_2)=\tfrac12=E[X]$.`},
      {q:R`State which of these are numbers and which are random variables: $E[X]$, $E[X|Y]$, $E[X|Y=0.7]$, $\mathrm{Var}(X|Y)$, $f(Y)$.`,
       a:R`Numbers: $E[X]$, $E[X|Y=0.7]$ ($=0.35$ here). Random variables: $E[X|Y]$, $\mathrm{Var}(X|Y)$ (both functions of $Y$), $f(Y)$.`},
      {q:R`Prove the variance decomposition $\mathrm{Var}(X)=E[\mathrm{Var}(X|Y)]+\mathrm{Var}(E[X|Y])$ and evaluate both terms for part b).`,
       a:R`$\mathrm{Var}(X)=E[X^2]-E[X]^2=E[E[X^2|Y]]-E[E[X|Y]]^2$. Add and subtract $E[E[X|Y]^2]$: $=E\big[E[X^2|Y]-E[X|Y]^2\big]+\big(E[E[X|Y]^2]-E[E[X|Y]]^2\big)=E[\mathrm{Var}(X|Y)]+\mathrm{Var}(E[X|Y])$. Here $\mathrm{Var}(X)=\tfrac1{12}$; $\mathrm{Var}(E[X|Y])=\mathrm{Var}(Y/2)=\tfrac14\cdot\tfrac2{12}=\tfrac1{24}$; so $E[\mathrm{Var}(X|Y)]=\tfrac1{12}-\tfrac1{24}=\tfrac1{24}$: knowing $Y$ removes half the uncertainty in $X$.`},
      {q:R`Let $T^\ast(Y)$ minimize $E[(X-T(Y))^2]$ over all measurable $T$. Identify $T^\ast$, name it, prove optimality, and give the minimum value for part b).`,
       a:R`$T^\ast(Y)=E[X|Y]$, the MMSE estimator. Proof: write $X-T=(X-E[X|Y])+(E[X|Y]-T)$; the cross term vanishes because $E[(X-E[X|Y])h(Y)]=E[h(Y)E[X-E[X|Y]\,|\,Y]]=0$; so $E(X-T)^2=E[\mathrm{Var}(X|Y)]+E(E[X|Y]-T)^2\ge E[\mathrm{Var}(X|Y)]$, with equality iff $T=E[X|Y]$. Minimum for part b): $E[\mathrm{Var}(X|Y)]=\tfrac1{24}$.`},
      {q:R`Give an example where $E[f(X)]$ does not exist, and explain what "exist" means.`,
       a:R`Existence means $E[|f(X)|]&lt;\infty$ (or at least one of $E[f^+],E[f^-]$ finite). Take $X$ standard Cauchy and $f(x)=x$: both tails integrate to $\infty$, so $E[X]$ is $\infty-\infty$, undefined.`},
      {q:R`Define bias and variance of an estimator; for i.i.d. samples with mean $\theta$ and variance $\sigma^2$, compare the estimators $\hat\theta_1=\bar Y$ and $\hat\theta_2=\tfrac{N}{N+1}\bar Y$ in bias, variance and MSE.`,
       a:R`$\mathrm{bias}=E[\hat\theta|\theta]-\theta$, $\mathrm{var}=E[(\hat\theta-E\hat\theta)^2]$, $\mathrm{MSE}=\mathrm{var}+\mathrm{bias}^2$. $\hat\theta_1$: bias 0, variance $\sigma^2/N$. $\hat\theta_2$: bias $-\theta/(N+1)$, variance $\tfrac{N^2}{(N+1)^2}\tfrac{\sigma^2}N=\tfrac{N\sigma^2}{(N+1)^2}$, MSE $=\tfrac{N\sigma^2+\theta^2}{(N+1)^2}$, which is smaller than $\sigma^2/N$ when $\theta^2&lt;\sigma^2(2N+1)/N$: shrinkage trades bias for variance (a MAP-like effect).`}
     ]}
  ]
 },
 {
  id:"cnnparams", name:"CNN tensor shapes and parameter counting (valid boundary sizes, kernels, offsets)", prob:80, trend:"stable",
  years:["2020 P3–P4","2021 Q6","2022 Q4","2023 P3","2026 P3"],
  evidence: R`Five of seven Midterm 1s (and Midterm 2 in 2025). Always the same picture: a two-layer CNN with $k\times k$ kernels, "valid" boundary conditions, given input/output channel counts; compute $N_1=N_0-(k-1)$, $N_2$, the shapes of $w_1,w_2,b_1,b_2$, and the total parameter count; sometimes the rank of tensors in Einstein notation and the advantages of convolution over fully connected layers.`,
  concepts:[
   R`Valid convolution reduces each spatial dimension by $k-1$: $N_{out}=N_{in}-k+1$ (stride 1). "Same" keeps $N$. With stride $s$: $N_{out}=\lfloor(N_{in}-k)/s\rfloor+1$ (valid).`,
   R`A conv layer $C_{in}\to C_{out}$ with $k\times k$ kernels: $w$ has shape $k\times k\times C_{in}\times C_{out}$ (rank 4), $b$ has shape $C_{out}$ (rank 1); parameters $k^2C_{in}C_{out}+C_{out}$. Pooling and ReLU have no parameters; batch norm has $2C$.`,
   R`Einstein notation $x^j=w^j_{i_1,i_2}z^{i_1,i_2}$: repeated indices are summed; ranks are the numbers of axes (here 2, 1, 3).`,
   R`Fully connected layer on an $N\times N\times C$ image: $(N^2C_{in})(N^2C_{out})$ weights, astronomically more. Convolution: fewer parameters, less data and compute, space invariance, better accuracy on images.`
  ],
  problems:[
   { title:"Three-layer CNN with mixed boundary conditions", points:30,
     intro: R`Input: $64\times64\times3$ color image. Layer 1: $7\times7$ kernels, $3\to32$ channels, valid, stride 1, ReLU. Layer 2: $3\times3$ kernels, $32\to32$, "same" boundary, stride 2, ReLU. Layer 3: $1\times1$ kernels, $32\to10$, no offset-free tricks (has offsets), no nonlinearity.`,
     parts:[
      {q:R`Compute the spatial sizes $N_1$, $N_2$, $N_3$ of the three outputs.`,
       a:R`$N_1=64-(7-1)=58$. Same padding with stride 2: $N_2=\lceil58/2\rceil=29$. $1\times1$ convolution: $N_3=29$.`},
      {q:R`Give the shapes of $w_1,b_1,w_2,b_2,w_3,b_3$.`,
       a:R`$w_1:7\times7\times3\times32$, $b_1:32$; $w_2:3\times3\times32\times32$, $b_2:32$; $w_3:1\times1\times32\times10$, $b_3:10$.`},
      {q:R`Count the parameters per layer and in total (show the arithmetic).`,
       a:R`L1: $49\cdot3\cdot32=4704$, $+32=4736$. L2: $9\cdot32\cdot32=9216$, $+32=9248$. L3: $32\cdot10=320$, $+10=330$. Total $4736+9248+330=14314$.`},
      {q:R`If layer 1 were fully connected (every input value to every output value), how many weights would it have?`,
       a:R`Inputs $64\cdot64\cdot3=12288$, outputs $58\cdot58\cdot32=107648$: $12288\times107648\approx1.32\times10^9$ weights (plus 107648 offsets), about $280{,}000$ times more than the convolutional layer.`},
      {q:R`In $x^{j}_{m,n}=w^{j}_{i,k_1,k_2}\,z^{i}_{m+k_1,n+k_2}+b^j$, what are the ranks of $z$, $w$, $x$, $b$? Which indices are summed?`,
       a:R`$z$: rank 3 ($i,m,n$); $w$: rank 4 ($j,i,k_1,k_2$); $x$: rank 3; $b$: rank 1. Repeated indices $i,k_1,k_2$ are summed (input channels and kernel offsets).`},
      {q:R`List four advantages of convolutional over fully connected layers for images.`,
       a:R`Far fewer parameters; less training data needed; less computation and memory; space (shift) invariance that matches image statistics; typically better accuracy for vision tasks.`}
     ]}
  ]
 },
 {
  id:"adjoint", name:"Convolution blocks as matrices and their adjoints (back-propagation through a conv layer)", prob:65, trend:"rising",
  years:["2022 Q5","2024 P4","2026 P4"],
  evidence: R`Three of seven Midterm 1s (also Midterm 2 in 2021, 2024, 2025). The 1-D toy: $x=y*w$ with a 3-tap kernel, valid boundary, $N$ inputs: write $A_w$ ($(N-2)\times N$ Toeplitz with rows $[w_2,w_1,w_0]$), its transpose (convolution with the reversed kernel, zero-padded, "full"), the matrix $C_y$ mapping $w\to x$ ($(N-2)\times3$ with rows $[y_{n+2},y_{n+1},y_n]$) and its transpose (correlation of $\epsilon$ with $y$, valid, 3 outputs); interpret each; gradient of the MSE loss $\nabla_yL=-\tfrac2KA^t\sum_k(x_k-f(y))$.`,
  concepts:[
   R`True (not correlation) 1-D convolution $x_n=\sum_kw_ky_{n+2-k}$ (valid, kernel length 3): $x=A_wy$ with $[A_w]_{n,m}=w_{n+2-m}$, shape $(N-2)\times N$, each row $[0\cdots0,w_2,w_1,w_0,0\cdots0]$.`,
   R`Adjoint $A_w^t$ ($N\times(N-2)$): $A_w^t\epsilon$ is convolution of the zero-padded $\epsilon$ with the time-reversed kernel $[w_0,w_1,w_2]$ ("full" boundary), equivalently correlation with $w$. This is the back-propagated error $\delta=A_w^t\epsilon$.`,
   R`Gradient w.r.t. the kernel: $x=C_yw$ with $[C_y]_{n,k}=y_{n+2-k}$, shape $(N-2)\times3$; $g_w=C_y^t\epsilon$, $[g_w]_k=\sum_n\epsilon_ny_{n+2-k}$: correlation of the error with the input, valid, exactly 3 outputs. For 2-D and multichannel the same pattern holds per channel pair.`,
   R`MSE loss $L(y)=\tfrac1K\sum_k\|x_k-f(y)\|^2$ with $f(y)=Ay+b$: $\nabla_yL=-\tfrac2K\sum_k(x_k-f(y))^tA$ (row vector), so $[\nabla_yL]^t=A^t\epsilon$ with $\epsilon=-\tfrac2K\sum_k(x_k-f(y))$: apply the adjoint to the averaged error.`,
   R`"Same" boundary with circular wrap gives a circulant $A$ ($A_{i,j}=w_{i-j}$); its transpose is circular convolution with $w_{-i}$. For a linear layer the back-prop map $\delta=A^t\epsilon$ does not depend on the input; for a nonlinear layer it does.`
  ],
  problems:[
   { title:"Adjoint of a stride-2 convolution block", points:35,
     intro: R`Let $x=f(y)=\downarrow_2(y*w)$ where $y\in\mathbb R^7$, $w=[w_0,w_1,w_2]$ (true convolution, valid boundary), and $\downarrow_2$ keeps every other output starting from index 0 (stride 2). The loss is $L(y)=\tfrac1K\sum_k\|x_k-f(y)\|^2$.`,
     parts:[
      {q:R`Give the shape of $x$ and write $f(y)=Ay$ explicitly.`,
       a:R`Full valid convolution gives 5 outputs $z_n=\sum_kw_ky_{n+2-k}$, $n=0..4$; keeping $n=0,2,4$ gives $x\in\mathbb R^3$: $$A=\begin{bmatrix}w_2&w_1&w_0&0&0&0&0\\0&0&w_2&w_1&w_0&0&0\\0&0&0&0&w_2&w_1&w_0\end{bmatrix}\quad(3\times7).$$`},
      {q:R`Write $A^t$ and interpret $\delta=A^t\epsilon$ as a sequence of standard operations.`,
       a:R`$A^t$ is $7\times3$ with columns equal to the rows above: $\delta=[w_2\epsilon_0,\;w_1\epsilon_0,\;w_0\epsilon_0+w_2\epsilon_1,\;w_1\epsilon_1,\;w_0\epsilon_1+w_2\epsilon_2,\;w_1\epsilon_2,\;w_0\epsilon_2]^t$. This is: zero-insertion upsampling of $\epsilon$ (place $\epsilon_n$ at position $2n$), then "full" convolution with the reversed kernel $[w_0,w_1,w_2]$. The adjoint of (convolve, downsample) is (upsample by zero insertion, convolve with the flipped kernel): a transposed convolution.`},
      {q:R`Write $f(y)=C_yw$ and give $C_y$ and $C_y^t\epsilon$ in words.`,
       a:R`$C_y=\begin{bmatrix}y_2&y_1&y_0\\y_4&y_3&y_2\\y_6&y_5&y_4\end{bmatrix}$ ($3\times3$). $g_w=C_y^t\epsilon=\big[\sum_n\epsilon_ny_{2n+2},\;\sum_n\epsilon_ny_{2n+1},\;\sum_n\epsilon_ny_{2n}\big]$: a stride-2 correlation of the error with the input, one number per tap.`},
      {q:R`Derive $[\nabla_yL]^t$ and $[\nabla_wL]^t$.`,
       a:R`With $\bar\epsilon=-\tfrac2K\sum_k(x_k-f(y))$: $[\nabla_yL]^t=A^t\bar\epsilon$ (transposed convolution of the averaged error) and $[\nabla_wL]^t=C_y^t\bar\epsilon$ (strided correlation of the averaged error with $y$).`},
      {q:R`Why is $A^t$ exactly the operation used by "transposed convolution" (deconvolution) layers in decoder networks, and what is its output size for an input of length $N_x$?`,
       a:R`A decoder must map a coarse feature map back to a fine one; the adjoint of the encoder's strided convolution does precisely that and is what back-propagation computes anyway. Output length $=2(N_x-1)+3=2N_x+1$ (here $7$ from $3$).`},
      {q:R`Count the multiplies for $Ay$ and for $A^t\epsilon$ and comment.`,
       a:R`Both equal the number of nonzeros in $A$: $3\times3=9$. The adjoint costs the same as the forward pass, which is why the backward pass of a CNN is only about twice the forward cost (one adjoint for $\delta$, one for $g_w$).`}
     ]}
  ]
 },
 {
  id:"gd", name:"Gradient descent: conditioning, stability of the step size, preconditioning, contour sketches", prob:65, trend:"stable",
  years:["2020 P5e","2021 Q5","2024 P3","2025 P3"],
  evidence: R`Four of seven. The quadratic $f(\theta)=\tfrac12\theta^tH\theta$ (or $a(x_1+x_2)^2+b(x_1-x_2)^2$): sketch the elongated contours, condition number $=\lambda_{\max}/\lambda_{\min}$, negative gradient direction on the sketch, largest stable step $\alpha&lt;2/\lambda_{\max}$, slow convergence of the small-eigenvalue direction $(1-\alpha\lambda_{\min})^k$, and the fix: preconditioning $\theta\leftarrow\theta-\alpha MH\theta$ with $M\approx H^{-1}$ (diagonal if $H$ is).`,
  concepts:[
   R`For $f(\theta)=\tfrac12\theta^tH\theta-b^t\theta$, $\nabla f=H\theta-b$, Hessian $H$. GD: $\theta\leftarrow\theta-\alpha(H\theta-b)$, error $e_{k+1}=(I-\alpha H)e_k$. In the eigenbasis each component scales by $1-\alpha\lambda_i$; stable iff $|1-\alpha\lambda_i|&lt;1$ for all $i$, i.e. $0&lt;\alpha&lt;2/\lambda_{\max}$.`,
   R`With $\alpha$ near $1/\lambda_{\max}$ the slow mode contracts by $1-\lambda_{\min}/\lambda_{\max}=1-1/\kappa$ per step; iterations to converge scale with the condition number $\kappa=\lambda_{\max}/\lambda_{\min}$. Contours are ellipses with axis ratio $\sqrt\kappa$; the gradient is perpendicular to the contour and mostly points across the narrow valley, causing zig-zag.`,
   R`Preconditioning: $\theta\leftarrow\theta-\alpha M\nabla f$ with $M\succ0$; $M=H^{-1}$ gives Newton's method (one step for quadratics); diagonal $M=\mathrm{diag}(1/H_{ii})$ is cheap and rescales coordinates. Adam approximates a diagonal preconditioner from gradient statistics. Momentum also accelerates along the valley.`,
   R`Line search: exact step for a quadratic $\alpha^\ast=\dfrac{d^td}{d^tHd}$ with $d=-\nabla f$.`
  ],
  problems:[
   { title:"An ill-conditioned quadratic", points:35,
     intro: R`Let $f(\theta)=\tfrac12\theta^tH\theta$ with $H=\begin{bmatrix}100&0\\0&1\end{bmatrix}$, and gradient descent $\theta\leftarrow\theta-\alpha\nabla f(\theta)$ starting at $\theta^{(0)}=(1,1)$.`,
     parts:[
      {q:R`Compute $\nabla f$, the Hessian, the condition number, and sketch the contours of $f$ with the negative gradient at $\theta^{(0)}$.`,
       a:R`$\nabla f=H\theta=(100\theta_1,\theta_2)$; Hessian $H$; condition number $\kappa=100/1=100$. Contours $50\theta_1^2+\tfrac12\theta_2^2=c$ are ellipses 10 times longer along $\theta_2$ than $\theta_1$. At $(1,1)$ the negative gradient $(-100,-1)$ points almost straight across the narrow valley, not toward the origin.`},
      {q:R`Write the update for each coordinate and find the largest $\alpha$ for which GD converges.`,
       a:R`$\theta_1\leftarrow(1-100\alpha)\theta_1$, $\theta_2\leftarrow(1-\alpha)\theta_2$. Need $|1-100\alpha|&lt;1$ and $|1-\alpha|&lt;1$: $0&lt;\alpha&lt;0.02$.`},
      {q:R`With $\alpha=0.019$, how many iterations until $|\theta_2|&lt;e^{-1}$? What is $\theta_1$ doing meanwhile?`,
       a:R`$\theta_2^{(k)}=0.981^k$; $0.981^k=e^{-1}\Rightarrow k=\dfrac{1}{-\ln0.981}\approx52$ iterations. Meanwhile $\theta_1^{(k)}=(-0.9)^k$ oscillates in sign and decays quickly ($|\theta_1|&lt;e^{-1}$ after 10 steps): fast, zig-zagging convergence across the valley, slow convergence along it.`},
      {q:R`Propose a preconditioner $M$ and show the preconditioned update converges in one step for a suitable $\alpha$.`,
       a:R`$M=H^{-1}=\mathrm{diag}(0.01,1)$: $\theta\leftarrow\theta-\alpha MH\theta=(1-\alpha)\theta$, so $\alpha=1$ gives $\theta=0$ in one step (Newton's method). More generally any $M$ with $MH$ well-conditioned speeds convergence.`},
      {q:R`Now let $H=A^t\Sigma A$ with $A$ a rotation by $45^\circ$ and $\Sigma=\mathrm{diag}(100,1)$. What changes in the contour sketch and in the stability limit? Is a diagonal preconditioner still effective?`,
       a:R`Same eigenvalues, so the stability limit stays $\alpha&lt;2/100$ and $\kappa=100$; the ellipses are rotated so their long axis lies along $\theta_1=-\theta_2$ (or $\theta_1=\theta_2$, depending on the rotation direction). A diagonal preconditioner is now ineffective because $H_{11}=H_{22}=50.5$: it cannot see the rotated axes. The full $H^{-1}$ (or a rotation to the eigenbasis) is needed.`},
      {q:R`Why does the general rule "use $\alpha&lt;2/\lambda_{\max}$" make deep-learning training slow, and what two standard tools address it?`,
       a:R`Loss surfaces have a huge spread of curvatures; a step safe for the stiffest direction is tiny for the flat ones, so convergence takes many epochs. Momentum (accumulate a velocity to move along flat valleys) and adaptive per-parameter step sizes such as Adam (approximate diagonal preconditioning) address it.`}
     ]}
  ]
 },
 {
  id:"mle", name:"Maximum likelihood, one-hot encoding, the simplex, softmax and cross-entropy", prob:65, trend:"stable",
  years:["2022 Q3","2023 P4","2024 P1","2025 P5"],
  evidence: R`Four of seven. Asks: name one-hot encoding and its advantages; define the simplex and prove it is convex; show softmax lands in the interior of the simplex; write $p_\theta(x|y)=\prod_m[f_\theta(y)]_m^{x_m}$ for one-hot $x$; the negative log-likelihood of $K$ samples is the cross-entropy loss; the ML estimate of class probabilities is the empirical frequency $\hat\theta_m=N_m/N$; the gradient of $\sum\rho(x_n,\sigma(\theta))$ and its minimizer $\theta^\ast_m=\beta+\log N_m$; advantages/disadvantages of ML.`,
  concepts:[
   R`One-hot: class $m$ is the vector $e_m$; all classes are equidistant ($\|e_i-e_j\|=\sqrt2\,\delta(i\ne j)$), unlike integer codes where $|i-j|$ depends on the labels; cost is $M$ numbers instead of one.`,
   R`Simplex $S_M=\{p\ge0,\sum_mp_m=1\}$: convex (mixtures stay in it), closed, bounded. Softmax $[\sigma(z)]_i=\dfrac{e^{z_i}}{\sum_je^{z_j}}$ has strictly positive entries summing to 1: interior of the simplex; invariant to adding a constant to $z$.`,
   R`Likelihood of one-hot $x$ given $\hat p=f_\theta(y)$: $P\{X=x|y\}=\prod_m\hat p_m^{x_m}$; $-\log$ of it is $\rho(x,\hat p)=-\sum_mx_m\log\hat p_m$ (cross-entropy). For $K$ i.i.d. pairs the NLL is $\sum_k\rho(x_k,f_\theta(y_k))$ plus $-\sum_k\log p(y_k)$: minimizing cross-entropy $=$ ML.`,
   R`Direct multinomial: $L(\theta)=\sum_m-N_m\log\theta_m$ is convex on the open simplex; ML $\hat\theta_m=N_m/N$. With logits $\theta$ and softmax: $L=\sum_mN_m(-\theta_m+\log\sum_je^{\theta_j})$, $\partial L/\partial\theta_m=-N_m+N[\sigma(\theta)]_m$, so $\theta^\ast_m=\log N_m+\beta$. Gradient of CE w.r.t. logits is $\hat p-x$ (per sample).`,
   R`ML advantages: no prior needed, (asymptotically) unbiased and efficient, good with lots of data. Disadvantages: overfits with little data / many parameters, ignores prior knowledge (MAP adds a regularizer).`
  ],
  problems:[
   { title:"Softmax, cross-entropy and the ML classifier", points:35,
     intro: R`Let $\sigma:\mathbb R^M\to\mathbb R^M$ be the softmax, $\rho(a,b)=-\sum_ia_i\log b_i$, and let $x_n$, $n=0,\dots,N-1$, be one-hot labels with class counts $N_m$. Define $L(\theta)=\sum_n\rho(x_n,\sigma(\theta))$ for a logit vector $\theta\in\mathbb R^M$.`,
     parts:[
      {q:R`Prove that $\sigma(z)$ lies in the interior of the simplex for every $z$.`,
       a:R`$[\sigma(z)]_i=e^{z_i}/\sum_je^{z_j}>0$ and $\sum_i[\sigma(z)]_i=\sum_ie^{z_i}/\sum_je^{z_j}=1$; strict positivity means no coordinate is 0, so the point is not on the boundary.`},
      {q:R`Show $\sigma(z+c\mathbf 1)=\sigma(z)$ for any scalar $c$, and explain the consequence for the minimizer of $L$.`,
       a:R`$e^{z_i+c}/\sum_je^{z_j+c}=e^ce^{z_i}/(e^c\sum_je^{z_j})=[\sigma(z)]_i$. Hence $L(\theta+c\mathbf 1)=L(\theta)$: the minimizer is determined only up to an additive constant (not unique).`},
      {q:R`Express $L(\theta)$ in terms of the counts $N_m$.`,
       a:R`$\rho(x_n,\sigma(\theta))=-\theta_{m_n}+\log\sum_je^{\theta_j}$ where $m_n$ is the class of sample $n$. Summing: $L(\theta)=\sum_mN_m\Big(-\theta_m+\log\sum_je^{\theta_j}\Big)=-\sum_mN_m\theta_m+N\log\sum_je^{\theta_j}$.`},
      {q:R`Compute $\partial L/\partial\theta_m$ and the minimizer $\theta^\ast$.`,
       a:R`$\dfrac{\partial L}{\partial\theta_m}=-N_m+N\dfrac{e^{\theta_m}}{\sum_je^{\theta_j}}=-N_m+N[\sigma(\theta)]_m$. Setting to zero: $[\sigma(\theta^\ast)]_m=N_m/N$, so $\theta^\ast_m=\log N_m+\beta$ for any constant $\beta$; the predicted probabilities are the empirical class frequencies.`},
      {q:R`For a single training pair with one-hot $x$ and logits $z$, show the gradient of $\rho(x,\sigma(z))$ with respect to $z$ is $\sigma(z)-x$.`,
       a:R`$\rho=-\sum_ix_iz_i+\log\sum_je^{z_j}$ (using $\sum_ix_i=1$). $\partial\rho/\partial z_m=-x_m+e^{z_m}/\sum_je^{z_j}=[\sigma(z)]_m-x_m$. This is the error signal back-propagated from a softmax classifier.`},
      {q:R`Explain why minimizing the cross-entropy over a network's parameters is maximum-likelihood estimation, and give one advantage and one disadvantage of ML.`,
       a:R`With $P\{X_k=x_k|y_k\}=\prod_m[f_\theta(y_k)]_m^{x_{k,m}}$, the negative log-likelihood of the i.i.d. training set is $\sum_k\rho(x_k,f_\theta(y_k))-\sum_k\log p(y_k)$; the second term does not depend on $\theta$, so minimizing the cross-entropy sum maximizes the likelihood. Advantage: no prior needed, consistent and efficient with enough data. Disadvantage: overfits when data is scarce relative to parameters; adding a prior (MAP) becomes regularization.`}
     ]}
  ]
 },
 {
  id:"gradcomplex", name:"Gradient of the loss, Jacobian shapes, forward vs. backward evaluation and multiply counts", prob:55, trend:"stable",
  years:["2020 P5","2023 P2","2024 P2","2025 P4"],
  evidence: R`Four of seven. Asks: the shape of $A=\nabla_\theta f_\theta(y)$ ($N_x\times p$) and the meaning of $A_{i,j}$; $\nabla_\theta L=-\tfrac2K\sum_k(x_k-f_\theta(y_k))^tA$; number of multiplies for general $A$ ($KN_xp+p$) and for rank-one $A=\mathbf 1\theta^t$; forward vs. backward evaluation of matrix chains ($a^tBC$ vs $DEf$: $p^3+p^2$ or $2p^2$) and the rule: evaluate from the small end; why back-propagation is used (loss output dimension is 1).`,
  concepts:[
   R`Jacobian $A=\nabla_\theta f_\theta(y)\in\mathbb R^{N_x\times p}$, $A_{i,j}=\partial[f_\theta(y)]_i/\partial\theta_j$ (rows = outputs, columns = parameters). $A^t\in\mathbb R^{p\times N_x}$.`,
   R`MSE loss $L=\tfrac1K\sum_k\|x_k-f_\theta(y_k)\|^2$: $\nabla_\theta L=-\tfrac2K\sum_k(x_k-f_\theta(y_k))^tA_k$ (a $1\times p$ row), equivalently $[\nabla L]^t=-\tfrac2K\sum_kA_k^t(x_k-f_\theta(y_k))$: multiply the adjoint by the error.`,
   R`Cost: each $(\text{error})^tA$ is $N_xp$ multiplies; $K$ samples give $KN_xp$, plus $p$ for the scaling. Special structure (rank one, convolution) cuts this dramatically.`,
   R`Matrix chains: $a^tBC$ evaluated as $(a^tB)C$ costs $2p^2$, as $a^t(BC)$ costs $p^3+p^2$; $DEf$ as $D(Ef)$ costs $2p^2$, as $(DE)f$ costs $p^3+p^2$. Rule: start multiplying from the end with the smaller dimension (vector). Back-propagation is the backward evaluation because the loss has output dimension 1.`,
   R`Chain of matrices $A\in\mathbb R^{N\times1}$, $B\in\mathbb R^{1\times N}$,...: left-to-right can cost $O(N^2)$ per product, right-to-left $O(N)$.`
  ],
  problems:[
   { title:"Jacobians, gradient cost and evaluation order in a three-layer network", points:30,
     intro: R`A network $f_\theta(y)=W_3\sigma(W_2\sigma(W_1y))$ has layer widths $N_0=1000$ (input), $N_1=N_2=500$, $N_3=10$ (output), with $W_i\in\mathbb R^{N_i\times N_{i-1}}$, and is trained with $L=\tfrac1K\sum_k\|x_k-f_\theta(y_k)\|^2$. Let $D_i$ denote the diagonal ReLU-mask Jacobians.`,
     parts:[
      {q:R`Write the Jacobian $A=\nabla_yf_\theta(y)$ as a product of matrices and give its shape.`,
       a:R`$A=W_3D_2W_2D_1W_1$, shape $N_3\times N_0=10\times1000$.`},
      {q:R`Compute the multiplies needed to form $A$ explicitly (i) right-to-left starting with $W_2D_1W_1$, and (ii) left-to-right starting with $W_3D_2W_2$. (Multiplication by a diagonal mask costs one multiply per entry; you may neglect those.)`,
       a:R`(i) $W_2(D_1W_1)$: $500\times500\times1000=2.5\times10^8$; then $W_3D_2(\cdot)$: $10\times500\times1000=5\times10^6$; total $\approx2.55\times10^8$. (ii) $(W_3D_2)W_2$: $10\times500\times500=2.5\times10^6$; then $(\cdot)D_1W_1$: $10\times500\times1000=5\times10^6$; total $7.5\times10^6$, about 34 times cheaper. Start from the small end.`},
      {q:R`For the loss gradient we only need $\epsilon^tA$ for the row vector $\epsilon^t=-\tfrac2K(x_k-f)^t\in\mathbb R^{1\times10}$. Count the multiplies for evaluating $\epsilon^tA$ left-to-right (back-propagation) versus forming $A$ first.`,
       a:R`Left-to-right: $\epsilon^tW_3$ ($10\times500=5\times10^3$), then $(\cdot)D_2W_2$ ($500\times500=2.5\times10^5$), then $(\cdot)D_1W_1$ ($500\times1000=5\times10^5$): about $7.6\times10^5$ multiplies, roughly the cost of one forward pass. Forming $A$ first costs at least $7.5\times10^6$ (part b) plus $10^4$.`},
      {q:R`Generalize: state the rule for choosing the evaluation order of a chain $v^tM_1M_2\cdots M_L$ or $M_1\cdots M_Lv$, and explain why training deep networks always uses the backward order.`,
       a:R`Always multiply from the vector end inward so that every product is matrix–vector, never matrix–matrix: forward accumulation when the input dimension is small, backward when the output dimension is small. A scalar loss has output dimension 1, so the backward order (reverse-mode differentiation, back-propagation) costs about one forward pass regardless of the number of parameters.`},
      {q:R`Now count the parameter-gradient cost: given the back-propagated row vectors $\delta_i^t$ at each layer, how many multiplies form $\nabla_{W_1}L,\nabla_{W_2}L,\nabla_{W_3}L$ for one training pair, and how does the total compare to the forward pass?`,
       a:R`Each is an outer product $\delta_i z_{i-1}^t$ with cost $N_iN_{i-1}$: $500\times1000+500\times500+10\times500=7.55\times10^5$, the same as one forward pass. Forward $+$ backward-error $+$ parameter gradients $\approx3$ forward passes, the classic "backward costs about twice forward" rule.`},
      {q:R`What is the shape of $\nabla_\theta f_\theta(y)$ (all parameters at once) and why is it never formed explicitly?`,
       a:R`$N_3\times p$ with $p=1000\cdot500+500\cdot500+500\cdot10=755{,}000$ parameters: a $10\times755{,}000$ matrix per sample. Back-propagation delivers $\epsilon^t\nabla_\theta f$ (one row of size $p$) directly without materializing it.`}
     ]}
  ]
 },
 {
  id:"train", name:"Training, validation and generalization (appears on Midterm 1 since 2026)", prob:30, trend:"new",
  years:["2026 P5"],
  evidence: R`Traditionally a Midterm 2 topic, but the 2026 Midterm 1 included the standard training/validation-curve problem (best epoch, overfitting, capacity, regularization, effect of ten times more data). See Midterm 2 for the full treatment; one problem is included here.`,
  concepts:[
   R`Training loss decreases monotonically; validation loss reaches a minimum then rises (overfitting). Choose the epoch minimizing validation loss (early stopping).`,
   R`Large train/validation gap: capacity too high for the data; fixes: more data, regularization (L1/L2, dropout), smaller model. Curves close together but high: capacity too low; increase model size or train longer.`,
   R`Ten times more data: training loss goes up (harder to fit), validation loss goes down (less overfitting); the gap closes.`
  ],
  problems:[
   { title:"Reading a training curve", points:25,
     intro: R`During training the training loss $L_T$ decreases steadily over 7 epochs while the validation loss $L_V$ falls until epoch 4 and then rises.`,
     parts:[
      {q:R`Which epoch's parameters should you keep and why?`,
       a:R`Epoch 4, where the validation loss is minimized: it is the best available proxy for performance on unseen data.`},
      {q:R`What happens if you keep the epoch-7 parameters?`,
       a:R`They are overfit to the training set (fitting its noise), so they generalize worse than the epoch-4 parameters despite lower training loss.`},
      {q:R`What does the curve say about model capacity, and what can you change if the architecture is fixed?`,
       a:R`Capacity is somewhat too high for the amount of data. Add regularization (L2 weight decay, L1 for sparsity, dropout), use early stopping, augment or collect more data.`},
      {q:R`Predict the effect of ten times more training data on both curves.`,
       a:R`Training loss rises (more data is harder to fit exactly); validation loss falls and its minimum moves later; the two curves come closer together.`},
      {q:R`Why is a separate test set still needed after using the validation set for early stopping?`,
       a:R`Model selection (epoch, hyperparameters) used the validation loss, so it is now an optimistically biased estimate; a never-touched test set gives an unbiased final measurement.`}
     ]}
  ]
 }
 ]
};
})();
