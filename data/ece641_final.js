window.EXAMDB = window.EXAMDB || {};
(function(){
const R = String.raw;
const C = window.EXAMDB.ece641 = window.EXAMDB.ece641 || {id:"ece641", code:"ECE 60141 (ECE 641)", title:"Foundations of Computational Imaging (formerly Model-Based Image & Signal Processing)", exams:{}};
C.exams.final = {
 id:"final", name:"Final", years:"Fall 2016 – Fall 2025 (10 finals)",
 format:"4–5 multi-part problems, 120 min, closed book with fact sheet (2023+); open-book 180 min in 2020–2022",
 mockCount:5, mockTime:"120 minutes",
 notes: R`<b>What the last ten finals look like.</b> The final is remarkably stable: an EM-algorithm problem for a mixture model has appeared on <em>every</em> final since 2016 (Poisson, exponential or Gaussian observations with a hidden multinomial class), a Markov-chain problem (irreducible / aperiodic / ergodic / reversible / stationary distribution, often a birth–death chain) in 9 of 10, and an ADMM or plug-and-play problem in 8 of 10 (PnP every year since 2021). Metropolis or Gibbs sampling attaches to the Markov-chain problem about half the time, and a maximum-likelihood / sufficient-statistics problem has opened the exam in 2022, 2024 and 2025. The final is second-half heavy: midterm topics (surrogates, GMRFs, ICD) appear only occasionally.`,
 categories:[
 {
  id:"em", name:"EM algorithm for mixture models (Poisson, exponential, Gaussian, discrete)", prob:97, trend:"stable",
  years:["2016 P2","2017 P3","2018 P3","2019 P3","2020 Q5","2021 Q3","2022 Q4","2023 P3–P4","2024 P3","2025 P4"],
  evidence: R`Ten out of ten finals, typically 25–42 points, and in 2023 two problems (general EM theory plus a Poisson mixture). The template never changes: hidden i.i.d. class labels $X_n\sim\pi_m$, observations $Y_n$ conditionally independent from an exponential-family distribution with class-dependent parameter; (a) joint density, (b) complete-data ML via natural sufficient statistics $N_m,\;b_m$, (c) posterior $f(m|y_n)$ by Bayes' rule, (d) E-step $=$ expected sufficient statistics, (e) M-step $=$ plug them into the complete-data ML formulas. Occasionally: name of the distribution (Gaussian mixture), whether EM reaches the global maximum (no), the $Q$-function and its surrogate property.`,
  concepts:[
   R`Complete data $(X,Y)$, incomplete data $Y$. Log-likelihood $l(\theta)=\log p_\theta(y)$ is hard; complete-data likelihood $\log p_\theta(x,y)$ is easy.`,
   R`$Q(\theta;\theta')=E[\log p_\theta(y,X)\mid Y=y,\theta']$. Key inequality: $l(\theta)\ge l(\theta')+Q(\theta;\theta')-Q(\theta';\theta')$ (Jensen), so $Q$ is a surrogate for $l$ up to a constant and EM never decreases the likelihood. EM converges to a stationary point, not necessarily the global maximum; initialization matters.`,
   R`Mixture template: $P\{X_n=m\}=\pi_m$, $p(y_n|x_n=m)=p_m(y_n)$ with $p_m$ exponential family. Natural sufficient statistics: $N_m=\sum_n\delta(X_n=m)$, $b_m=\sum_nY_n\delta(X_n=m)$ (and $S_m=\sum_nY_n^2\delta(X_n=m)$ or $\sum_nY_nY_n^t\delta(X_n=m)$ for Gaussians).`,
   R`Complete-data ML: $\hat\pi_m=N_m/N$; Poisson $\hat\lambda_m=b_m/N_m$; exponential $\hat\mu_m=b_m/N_m$; Gaussian $\hat\mu_m=b_m/N_m$, $\hat\sigma_m^2=S_m/N_m-\hat\mu_m^2$ (vector: $\hat R_m=S_m/N_m-\hat\mu_m\hat\mu_m^t$).`,
   R`E-step: $f_n(m)=P\{X_n=m|Y_n=y_n\}=\dfrac{p_m(y_n)\pi_m}{\sum_kp_k(y_n)\pi_k}$, then $\bar N_m=\sum_nf_n(m)$, $\bar b_m=\sum_ny_nf_n(m)$, $\bar S_m=\sum_ny_n^2f_n(m)$.`,
   R`M-step: same formulas with bars. Repeat until converged. Because the ML estimate is a function $\hat\theta=f(T)$ of the sufficient statistics, EM is simply $\theta\leftarrow f(E[T|y,\theta])$.`,
   R`Incomplete-data density $p(y)=\prod_n\sum_m\pi_mp_m(y_n)$ (a product of sums, which is why direct ML is hard).`
  ],
  problems:[
   { title:"EM for a Gaussian mixture with unknown means and variances", points:40,
     intro: R`Let $X_n$, $n=1,\dots,N$, be i.i.d. with $P\{X_n=m\}=\pi_m$, $m=0,\dots,M-1$, and let $Y_n$ be conditionally independent given $X_n$ with $Y_n|X_n=m\sim N(\mu_m,\sigma_m^2)$. Let $\theta=\{\pi_m,\mu_m,\sigma_m^2\}_{m=0}^{M-1}$.`,
     parts:[
      {q:R`What is the name of the marginal distribution of $Y_n$? Write $p_\theta(y_n)$.`,
       a:R`A Gaussian mixture. $p_\theta(y_n)=\sum_{m=0}^{M-1}\pi_m\dfrac{1}{\sqrt{2\pi\sigma_m^2}}\exp\Big\{-\tfrac{(y_n-\mu_m)^2}{2\sigma_m^2}\Big\}$.`},
      {q:R`Write the complete-data log-likelihood $\log p_\theta(x,y)$ in terms of the natural sufficient statistics $N_m=\sum_n\delta(x_n-m)$, $b_m=\sum_ny_n\delta(x_n-m)$, $S_m=\sum_ny_n^2\delta(x_n-m)$.`,
       a:R`$\log p_\theta(x,y)=\sum_n\big[\log\pi_{x_n}-\tfrac12\log(2\pi\sigma_{x_n}^2)-\tfrac{(y_n-\mu_{x_n})^2}{2\sigma_{x_n}^2}\big]$ $=\sum_m\Big[N_m\log\pi_m-\tfrac{N_m}{2}\log(2\pi\sigma_m^2)-\tfrac{S_m-2\mu_mb_m+N_m\mu_m^2}{2\sigma_m^2}\Big]$.`},
      {q:R`Derive the complete-data ML estimates of $\pi_m$, $\mu_m$ and $\sigma_m^2$.`,
       a:R`$\hat\pi_m=N_m/N$ (Lagrange multiplier on $\sum\pi_m=1$). $\partial/\partial\mu_m$: $(b_m-N_m\mu_m)/\sigma_m^2=0\Rightarrow\hat\mu_m=b_m/N_m$. $\partial/\partial\sigma_m^2$: $-\tfrac{N_m}{2\sigma_m^2}+\tfrac{S_m-2\hat\mu_mb_m+N_m\hat\mu_m^2}{2\sigma_m^4}=0\Rightarrow\hat\sigma_m^2=\dfrac{S_m}{N_m}-\hat\mu_m^2$.`},
      {q:R`Use Bayes' rule to compute $f_n(m)=P\{X_n=m|Y_n=y_n\}$.`,
       a:R`$f_n(m)=\dfrac{\pi_m\,\sigma_m^{-1}\exp\{-(y_n-\mu_m)^2/2\sigma_m^2\}}{\sum_k\pi_k\,\sigma_k^{-1}\exp\{-(y_n-\mu_k)^2/2\sigma_k^2\}}$.`},
      {q:R`Specify the E-step and the M-step.`,
       a:R`<b>E-step</b> (using current $\theta$): compute $f_n(m)$ for all $n,m$ and $\bar N_m=\sum_nf_n(m)$, $\bar b_m=\sum_ny_nf_n(m)$, $\bar S_m=\sum_ny_n^2f_n(m)$. <b>M-step</b>: $\pi_m\leftarrow\bar N_m/N$, $\mu_m\leftarrow\bar b_m/\bar N_m$, $\sigma_m^2\leftarrow\bar S_m/\bar N_m-\mu_m^2$. Repeat until the change in $\theta$ (or in $\log p_\theta(y)$) is small.`},
      {q:R`Does EM always converge to the global maximum of the likelihood here? Explain, and name one practical failure mode of this particular model.`,
       a:R`No. EM increases $\log p_\theta(y)$ monotonically and converges to a stationary point, which may be a local maximum or a saddle; the result depends on initialization. A specific pathology: if one component captures a single data point, $\hat\sigma_m^2\to0$ and the likelihood diverges to $+\infty$ (degenerate solution); a floor on $\sigma_m^2$ or a prior is needed.`}
     ]},
   { title:"General EM theory: the Q-function as a surrogate", points:30,
     intro: R`Let $(X,Y)$ have joint density $p_\theta(x,y)$ and let $l(\theta)=\log p_\theta(y)$.`,
     parts:[
      {q:R`Define $Q(\theta;\theta')$.`,
       a:R`$Q(\theta;\theta')=E\big[\log p_\theta(X,y)\;\big|\;Y=y,\theta'\big]=\int p_{\theta'}(x|y)\log p_\theta(x,y)\,dx$.`},
      {q:R`Prove that $l(\theta)-l(\theta')\ge Q(\theta;\theta')-Q(\theta';\theta')$.`,
       a:R`$l(\theta)-l(\theta')=\log\dfrac{p_\theta(y)}{p_{\theta'}(y)}=\log\int p_{\theta'}(x|y)\dfrac{p_\theta(x,y)}{p_{\theta'}(x,y)}dx$ (multiply and divide by $p_{\theta'}(x|y)=p_{\theta'}(x,y)/p_{\theta'}(y)$). By Jensen's inequality ($\log$ is concave), $\log E[Z]\ge E[\log Z]$, so this is $\ge\int p_{\theta'}(x|y)\log\dfrac{p_\theta(x,y)}{p_{\theta'}(x,y)}dx=Q(\theta;\theta')-Q(\theta';\theta')$.`},
      {q:R`Sketch $l(\theta)$ and the function $\theta\mapsto l(\theta')+Q(\theta;\theta')-Q(\theta';\theta')$ and state the relationship in words.`,
       a:R`The second function is a lower bound on $l$ that touches $l$ at $\theta'$ (a minorizer). Maximizing it (the M-step) moves to a $\theta$ with $l(\theta)\ge l(\theta')$: EM is majorization–minimization applied to $-l$.`},
      {q:R`Write the general EM algorithm in terms of $Q$, and then in terms of the ML map $\hat\theta=f(T)$ when $p_\theta(x,y)$ is an exponential family with natural sufficient statistic $T(X,Y)$.`,
       a:R`<pre>Initialize &theta;
Repeat {  E-step: Q(&theta;;&theta;^k) = E[ log p_&theta;(X,y) | Y=y, &theta;^k ]
          M-step: &theta;^{k+1} = argmax_&theta; Q(&theta;;&theta;^k)  }</pre> For an exponential family $\log p_\theta(x,y)=\langle\eta(\theta),T(x,y)\rangle+d(\theta)+s(x,y)$ is linear in $T$, so $Q$ depends on the data only through $\bar T=E[T(X,Y)|y,\theta^k]$ and the M-step is $\theta^{k+1}=f(\bar T)$: <pre>Repeat { T&#772; &larr; E[T(X,Y)|Y=y,&theta;];  &theta; &larr; f(T&#772;) }</pre>`},
      {q:R`Show that a fixed point $\theta^\ast$ of EM (with differentiable $l$ and $Q$) is a stationary point of $l$.`,
       a:R`Let $g(\theta)=l(\theta')+Q(\theta;\theta')-Q(\theta';\theta')$ with $\theta'=\theta^\ast$. Then $g\le l$ with equality at $\theta^\ast$, so $l-g\ge0$ has a minimum at $\theta^\ast$ and $\nabla l(\theta^\ast)=\nabla g(\theta^\ast)=\nabla_\theta Q(\theta^\ast;\theta^\ast)$. At a fixed point $\theta^\ast$ maximizes $Q(\cdot;\theta^\ast)$, so $\nabla_\theta Q(\theta^\ast;\theta^\ast)=0$, hence $\nabla l(\theta^\ast)=0$.`}
     ]},
   { title:"EM for a hidden class with Bernoulli-vector observations", points:30,
     intro: R`Let $X_n\in\{0,\dots,M-1\}$ be i.i.d. with $P\{X_n=m\}=\pi_m$, and let $Y_n\in\{0,1\}^D$ be a binary vector whose components are conditionally independent given $X_n=m$ with $P\{Y_{n,d}=1|X_n=m\}=q_{m,d}$. Let $\theta=\{\pi_m,q_{m,d}\}$.`,
     parts:[
      {q:R`Write $p_\theta(y_n|x_n=m)$ and the complete-data likelihood $p_\theta(x,y)$.`,
       a:R`$p(y_n|m)=\prod_{d}q_{m,d}^{y_{n,d}}(1-q_{m,d})^{1-y_{n,d}}$ and $p_\theta(x,y)=\prod_n\pi_{x_n}\prod_dq_{x_n,d}^{y_{n,d}}(1-q_{x_n,d})^{1-y_{n,d}}$.`},
      {q:R`Identify the natural sufficient statistics and the complete-data ML estimates.`,
       a:R`$N_m=\sum_n\delta(x_n-m)$ and $b_{m,d}=\sum_ny_{n,d}\delta(x_n-m)$. Then $\hat\pi_m=N_m/N$ and $\hat q_{m,d}=b_{m,d}/N_m$ (fraction of class-$m$ samples with bit $d$ on).`},
      {q:R`Give the E-step.`,
       a:R`$f_n(m)=\dfrac{\pi_m\prod_dq_{m,d}^{y_{n,d}}(1-q_{m,d})^{1-y_{n,d}}}{\sum_k\pi_k\prod_dq_{k,d}^{y_{n,d}}(1-q_{k,d})^{1-y_{n,d}}}$, then $\bar N_m=\sum_nf_n(m)$ and $\bar b_{m,d}=\sum_ny_{n,d}f_n(m)$. (Compute in the log domain to avoid underflow.)`},
      {q:R`Give the M-step.`,
       a:R`$\pi_m\leftarrow\bar N_m/N$ and $q_{m,d}\leftarrow\bar b_{m,d}/\bar N_m$.`}
     ]}
  ]
 },
 {
  id:"mc", name:"Markov chains: irreducibility, aperiodicity, ergodicity, reversibility, stationary distribution", prob:92, trend:"stable",
  years:["2016 P3","2017 P1","2019 P4","2020 Q2–Q3","2021 Q2","2022 Q5","2023 P1,P5","2024 P4","2025 P5"],
  evidence: R`Nine of ten finals (only 2018 skipped it, and it had a Metropolis problem instead). Always: write $P$, prove or disprove irreducible / aperiodic / ergodic / reversible, find the stationary distribution (solve detailed balance for birth–death chains, or spot that a doubly-stochastic $P$ has the uniform distribution), and sometimes compute the time-reversed chain or $\lim_nP^n$. Infinite birth–death chains with $\rho=\lambda/\mu&lt;1$ appeared in 2020 and 2022.`,
  concepts:[
   R`Homogeneous MC: $P_{i,j}=P\{X_n=j|X_{n-1}=i\}$ independent of $n$; rows sum to 1; $P\{X_n=j\}=[\tau^tP^n]_j$.`,
   R`Irreducible: for every $i,j$ some $n$ has $[P^n]_{i,j}>0$ (exhibit a path with positive probability). Period of a state $=\gcd\{n:[P^n]_{i,i}>0\}$; if the chain is irreducible all states share the period, so one state with $P_{i,i}>0$ makes the whole chain aperiodic.`,
   R`Finite $+$ irreducible $+$ aperiodic $\Rightarrow$ ergodic: unique stationary $\pi$ solving the full balance equations $\pi^t=\pi^tP$ (FBE), $\lim_nP^n=\mathbf 1\pi^t$, and time averages converge to $\pi$-averages.`,
   R`Detailed balance equations (DBE) $\pi_iP_{i,j}=\pi_jP_{j,i}$. DBE $\Rightarrow$ FBE (sum over $i$). A stationary chain is reversible iff DBE hold. Birth–death chains (nearest-neighbor transitions) are always reversible: $\pi_{i+1}=\pi_i\lambda_i/\mu_{i+1}$.`,
   R`Symmetric $P$ (or any doubly-stochastic $P$) has the uniform stationary distribution; the time-reversed chain has $Q_{j,i}=P_{i,j}\pi_i/\pi_j$, and $Q=P^t$ when $\pi$ is uniform.`,
   R`Infinite birth–death chain: $\pi_i=\pi_0\rho^i$ with $\rho=\lambda/\mu$; normalizable iff $\rho&lt;1$, giving $\pi_i=(1-\rho)\rho^i$. If $\lambda\ge\mu$ the chain is not ergodic (drifts to infinity / null recurrent).`,
   R`Periodic example: deterministic cyclic shift $P_{i,(i+1)\bmod M}=1$ is irreducible but has period $M$; $P^n$ does not converge, although the uniform $\pi$ still solves the FBE.`
  ],
  problems:[
   { title:"A biased random walk on a ring", points:35,
     intro: R`Let $X_n\in\{0,1,\dots,M-1\}$ be a homogeneous Markov chain with $P_{i,(i+1)\bmod M}=p$, $P_{i,(i-1)\bmod M}=q$ and $P_{i,i}=1-p-q$, where $p,q>0$ and $p+q\le1$.`,
     parts:[
      {q:R`Write out $P$ for $M=4$.`,
       a:R`$P=\begin{bmatrix}1-p-q&p&0&q\\ q&1-p-q&p&0\\ 0&q&1-p-q&p\\ p&0&q&1-p-q\end{bmatrix}$.`},
      {q:R`Prove that the chain is irreducible.`,
       a:R`For any $i,j$ let $n=(j-i)\bmod M$. The path $i\to i+1\to\dots\to j$ has probability $p^n>0$, so $[P^n]_{i,j}\ge p^n>0$. Every pair of states communicates.`},
      {q:R`For which $(p,q)$ is the chain aperiodic? Give a periodic example.`,
       a:R`If $p+q&lt;1$ then $P_{i,i}>0$ and, being irreducible, the chain is aperiodic. If $p+q=1$ and $M$ is even, the walk alternates between even and odd states so the period is 2; e.g. $M=4$, $p=q=\tfrac12$: $[P^n]_{0,0}>0$ only for even $n$. (If $p+q=1$ and $M$ is odd the chain is still aperiodic because odd cycles exist.)`},
      {q:R`Assuming $p+q&lt;1$, is the chain ergodic? Find the stationary distribution.`,
       a:R`Finite, irreducible and aperiodic, hence ergodic. Every column of $P$ also sums to $p+q+(1-p-q)=1$, so $P$ is doubly stochastic and $\pi_i=1/M$ satisfies $\pi^tP=\pi^t$; by ergodicity it is the unique stationary distribution.`},
      {q:R`For which $(p,q)$ is the chain reversible? Prove your answer.`,
       a:R`DBE: $\pi_iP_{i,i+1}=\pi_{i+1}P_{i+1,i}\iff\tfrac1Mp=\tfrac1Mq$. So the chain is reversible iff $p=q$. If $p\ne q$ probability circulates around the ring in one preferred direction, which is visibly different when time is reversed.`},
      {q:R`Compute the transition matrix $Q$ of the time-reversed chain when $p\ne q$.`,
       a:R`$Q_{j,i}=P_{i,j}\pi_i/\pi_j=P_{i,j}$, so $Q=P^t$: the reversed chain steps clockwise with probability $q$ and counter-clockwise with probability $p$.`}
     ]},
   { title:"Random walk on a graph", points:35,
     intro: R`Let $\mathcal G$ be a connected undirected graph with vertices $\{0,\dots,M-1\}$, edge set $\mathcal E$ and vertex degrees $d_i\ge1$ (number of neighbors). A walker at vertex $i$ moves to each neighbor with probability $1/d_i$. Let $E=|\mathcal E|$ be the number of edges.`,
     parts:[
      {q:R`Write $P_{i,j}$ and show the chain is irreducible.`,
       a:R`$P_{i,j}=1/d_i$ if $\{i,j\}\in\mathcal E$, else 0. Connectedness means any two vertices are joined by a path of edges, each traversed with positive probability, so all states communicate.`},
      {q:R`Show that $\pi_i=d_i/(2E)$ satisfies the detailed balance equations, and conclude it is a stationary distribution.`,
       a:R`For an edge $\{i,j\}$: $\pi_iP_{i,j}=\dfrac{d_i}{2E}\cdot\dfrac1{d_i}=\dfrac1{2E}=\pi_jP_{j,i}$; for non-edges both sides are 0. $\sum_i\pi_i=\sum_id_i/(2E)=1$ since $\sum_id_i=2E$. DBE $\Rightarrow$ FBE, so $\pi$ is stationary; the walk is reversible.`},
      {q:R`Is the chain always aperiodic? Give a graph where it is periodic and explain what $P^n$ does there.`,
       a:R`No. On a bipartite graph (e.g. a 4-cycle, or any tree) the walker alternates sides, so the period is 2 and $P^n$ oscillates between two limits instead of converging to $\mathbf 1\pi^t$, although $\pi$ still solves the FBE. Any odd cycle (a triangle) or a self-loop makes it aperiodic.`},
      {q:R`Propose a minimal modification of the walk that guarantees ergodicity for every connected graph, and give its stationary distribution.`,
       a:R`The lazy walk: stay with probability $\tfrac12$, otherwise move as before: $P'=\tfrac12(I+P)$. $P'_{i,i}>0$ gives aperiodicity, irreducibility is unchanged, so the finite chain is ergodic. Since $\pi^tP=\pi^t$ implies $\pi^tP'=\pi^t$, the stationary distribution is still $\pi_i=d_i/2E$.`},
      {q:R`Evaluate $\pi$ for the path graph $0-1-2-3$ and for the complete graph on $M$ vertices, and interpret.`,
       a:R`Path: degrees $(1,2,2,1)$, $E=3$, $\pi=(\tfrac16,\tfrac13,\tfrac13,\tfrac16)$: the walker spends twice as much time at interior vertices. Complete graph: all degrees $M-1$, $\pi_i=1/M$ (uniform), since $P$ is symmetric.`},
      {q:R`How would you use this chain inside a Metropolis sampler for a target distribution $p(x)$ on the vertices, and what acceptance probability results?`,
       a:R`Use $q(j|i)=P_{i,j}$ as the (asymmetric) proposal in Hastings–Metropolis: $\alpha(i,j)=\min\Big\{1,\dfrac{p(j)q(i|j)}{p(i)q(j|i)}\Big\}=\min\Big\{1,\dfrac{p(j)\,d_i}{p(i)\,d_j}\Big\}$. The degree ratio corrects for the proposal's bias toward high-degree vertices; the resulting chain satisfies DBE with $p$.`}
     ]},
   { title:"Reversibility, the reversed chain and the limit of P^n", points:25,
     intro: R`Let $X_n$ be an ergodic finite MC with stationary distribution $\pi$ and transition matrix $P$.`,
     parts:[
      {q:R`Show that if the DBE hold for some probability vector $\pi$, then $\pi$ is stationary.`,
       a:R`$[\pi^tP]_j=\sum_i\pi_iP_{i,j}=\sum_i\pi_jP_{j,i}=\pi_j$.`},
      {q:R`Define reversibility via $P\{X_n=i,X_{n-1}=j\}=P\{X_n=j,X_{n-1}=i\}$ and prove it is equivalent to the DBE when $X_{n-1}\sim\pi$.`,
       a:R`$P\{X_{n-1}=j,X_n=i\}=\pi_jP_{j,i}$ and $P\{X_{n-1}=i,X_n=j\}=\pi_iP_{i,j}$; equality for all $i,j$ is exactly the DBE.`},
      {q:R`Show that $P^\infty=\lim_nP^n$ has every row equal to $\pi^t$.`,
       a:R`Ergodicity gives $P\{X_n=j|X_0=i\}=[P^n]_{i,j}\to\pi_j$ for every starting state $i$, so every row of $P^\infty$ is $\pi^t$: $P^\infty=\mathbf 1\pi^t$.`},
      {q:R`If $P$ is symmetric, what is $\pi$? Is the chain reversible?`,
       a:R`Symmetric $P$ is doubly stochastic, so $\pi_i=1/M$. Then $\pi_iP_{i,j}=P_{i,j}/M=P_{j,i}/M=\pi_jP_{j,i}$: the DBE hold, the chain is reversible, and $Q=P^t=P$.`}
     ]}
  ]
 },
 {
  id:"pnp", name:"Plug-and-Play, ADMM and proximal maps", prob:90, trend:"rising",
  years:["2016 P1","2018 P2","2019 P2","2021 Q4–Q5","2022 Q6","2023 P2","2024 P2","2025 P3"],
  evidence: R`Eight of ten finals. Early years asked for variable splitting, the augmented Lagrangian and ADMM for a positivity constraint; since 2021 every final has a PnP problem worth 25–60 points: interpret $F$ and $H$ as MAP estimates, show the equilibrium implies $\nabla f+\nabla h=0$, show $w^\ast=x^\ast-u^\ast$ is a fixed point of $T=(2H-I)(2F-I)$, prove $T$ is non-expansive, give the Mann iteration, describe training the denoiser, contrast MAP vs. MMSE denoisers, and (2024) handle a Poisson forward model.`,
  concepts:[
   R`Splitting $\min_{x=v}f(x)+h(v)$; augmented Lagrangian $L(x,v;u)=f(x)+h(v)+\tfrac a2\|x-v+u\|^2$; AL method alternates joint minimization with $u\leftarrow u+(x-v)$; ADMM minimizes $x$ and $v$ separately: $x\leftarrow F(v-u)$, $v\leftarrow H(x+u)$, $u\leftarrow u+(x-v)$.`,
   R`$F(z)=\arg\min_x\{f(x)+\tfrac a2\|x-z\|^2\}$: MAP estimate with likelihood $e^{-f}$ and prior $N(z,I/a)$. $H(z)=\arg\min_x\{\tfrac a2\|z-x\|^2+h(x)\}$: MAP denoiser for $Z=X+W$, $W\sim N(0,I/a)$, prior $e^{-h}$.`,
   R`Gaussian forward model $f(x)=\tfrac1{2\sigma_y^2}\|y-Ax\|^2$: $F(z)=\big(A^tA/\sigma_y^2+aI\big)^{-1}\big(A^ty/\sigma_y^2+az\big)$. Poisson forward model $Y\sim\mathrm{Pois}(x)$: $f(x)=\sum_n(x_n-y_n\log x_n)$ and $F$ solves a separable scalar problem per pixel.`,
   R`PnP: replace $H$ by a trained denoiser $\hat H$ (approximately the MMSE denoiser $E[X|Z]$, not the MAP denoiser); train on $(x_k,\;x_k+\sigma w_k)$ with squared-error loss; more general than MAP because $\hat H$ need not be a proximal map.`,
   R`Equilibrium $F(x^\ast-u^\ast)=x^\ast=H(x^\ast+u^\ast)$: with $w_1^\ast=x^\ast-u^\ast$, $w_2^\ast=x^\ast+u^\ast$ one has $(2F-I)w_1^\ast=w_2^\ast$, $(2H-I)w_2^\ast=w_1^\ast$, so $Tw_1^\ast=w_1^\ast$ and $x^\ast=F(w_1^\ast)$. $u^\ast$ is the "noise" removed by $H$ and re-injected by $F$.`,
   R`Convergence: proximal maps are firmly non-expansive; $2F-I$ non-expansive; if $\hat H$ is firmly non-expansive then $T$ is non-expansive and the Mann iteration $w\leftarrow(1-\rho)w+\rho Tw$ converges to a fixed point when one exists. Plain iteration $w\leftarrow Tw$ may fail (reflections).`,
   R`For Gaussian $X$, MMSE $=$ MAP; in general the MMSE denoiser is the conditional mean and the MAP denoiser the conditional mode.`
  ],
  problems:[
   { title:"Multi-agent consensus equilibrium with three agents", points:45,
     intro: R`Generalize plug-and-play to three agents $F_1,F_2,F_3:\mathbb R^N\to\mathbb R^N$: a data-fitting proximal map $F_1(v)=\arg\min_x\{\tfrac1{2\sigma_y^2}\|y-Ax\|^2+\tfrac1{2\sigma^2}\|x-v\|^2\}$, a learned denoiser $F_2$, and a positivity projection $F_3(v)=\max(v,0)$. The consensus equilibrium (CE) equations are $$F_i(x^\ast+u_i^\ast)=x^\ast\ (i=1,2,3),\qquad\sum_{i=1}^3\mu_iu_i^\ast=0,$$ with weights $\mu_i>0$, $\sum_i\mu_i=1$.`,
     parts:[
      {q:R`Show that for two agents with $\mu_1=\mu_2=\tfrac12$ the CE equations reduce to the PnP equilibrium $F_1(x^\ast-u^\ast)=x^\ast=F_2(x^\ast+u^\ast)$.`,
       a:R`$\tfrac12u_1^\ast+\tfrac12u_2^\ast=0$ gives $u_1^\ast=-u_2^\ast=:-u^\ast$, so the two equations read $F_1(x^\ast-u^\ast)=x^\ast$ and $F_2(x^\ast+u^\ast)=x^\ast$.`},
      {q:R`Suppose every $F_i$ is the proximal map of a convex differentiable $f_i$ with the same $\sigma^2$. Prove that any CE solution $x^\ast$ minimizes $\sum_i\mu_if_i(x)$.`,
       a:R`$F_i(x^\ast+u_i^\ast)=x^\ast$ means $\nabla f_i(x^\ast)+\tfrac1{\sigma^2}(x^\ast-(x^\ast+u_i^\ast))=0$, i.e. $\nabla f_i(x^\ast)=u_i^\ast/\sigma^2$. Multiply by $\mu_i$ and sum: $\nabla\sum_i\mu_if_i(x^\ast)=\tfrac1{\sigma^2}\sum_i\mu_iu_i^\ast=0$; convexity makes this stationary point a global minimizer.`},
      {q:R`Interpret $u_i^\ast$ and the constraint $\sum_i\mu_iu_i^\ast=0$ in words.`,
       a:R`$u_i^\ast$ is the offset agent $i$ needs added to the consensus $x^\ast$ so that it returns $x^\ast$: its "disagreement" with the consensus. The weighted disagreements cancel: the agents pull on $x^\ast$ with balanced forces, like a mechanical equilibrium.`},
      {q:R`Stack $w=(w_1,w_2,w_3)$ with $w_i\in\mathbb R^N$, define $\mathbf F(w)=(F_1(w_1),F_2(w_2),F_3(w_3))$ and the averaging operator $\mathbf G(w)=(\bar w,\bar w,\bar w)$ with $\bar w=\sum_i\mu_iw_i$. Show that the CE equations are equivalent to $\mathbf F(w^\ast)=\mathbf G(w^\ast)$ with $w_i^\ast=x^\ast+u_i^\ast$.`,
       a:R`$\bar w^\ast=\sum_i\mu_i(x^\ast+u_i^\ast)=x^\ast+\sum_i\mu_iu_i^\ast=x^\ast$, so $\mathbf G(w^\ast)=(x^\ast,x^\ast,x^\ast)$, and $\mathbf F(w^\ast)=(F_i(x^\ast+u_i^\ast))_i=(x^\ast,x^\ast,x^\ast)$ by the CE equations. Conversely $\mathbf F(w)=\mathbf G(w)$ defines $x^\ast=\bar w$ and $u_i^\ast=w_i-\bar w$, which sum (weighted) to zero.`},
      {q:R`Show that $\mathbf F(w^\ast)=\mathbf G(w^\ast)$ is equivalent to the fixed-point equation $\mathbf T w^\ast=w^\ast$ with $\mathbf T=(2\mathbf G-I)(2\mathbf F-I)$, using $\mathbf G^2=\mathbf G$ and $(2\mathbf G-I)^{-1}=2\mathbf G-I$.`,
       a:R`Since $\mathbf G$ is a projection, $(2\mathbf G-I)^2=4\mathbf G^2-4\mathbf G+I=I$. Then $\mathbf Tw=w\iff(2\mathbf F-I)w=(2\mathbf G-I)w\iff2\mathbf F(w)-w=2\mathbf G(w)-w\iff\mathbf F(w)=\mathbf G(w)$.`},
      {q:R`Give the Mann iteration for computing $w^\ast$ and state what property of the agents guarantees convergence. How is $x^\ast$ recovered?`,
       a:R`<pre>Initialize w = (w_1,w_2,w_3)
Repeat { w &larr; (1-&rho;) w + &rho; (2G - I)(2F - I) w }   with &rho; in (0,1)
x* &larr; average(w) = &Sigma; &mu;_i w_i</pre> If each $F_i$ is firmly non-expansive (true for proximal maps and projections, assumed for the trained denoiser), $2\mathbf F-I$ is non-expansive; $2\mathbf G-I$ is a reflection, also non-expansive; so $\mathbf T$ is non-expansive and the Mann iteration converges whenever a fixed point exists.`},
      {q:R`What does the weight $\mu_2$ on the denoiser control, and what happens as $\mu_2\to0$ or $\mu_2\to1$?`,
       a:R`It sets the relative strength of the prior versus the data and constraint agents (a regularization knob without changing the denoiser). $\mu_2\to0$ removes the prior: the solution tends to the positivity-constrained least-squares fit. $\mu_2\to1$ ignores the data: the solution collapses toward a fixed point of the denoiser alone (a "most plausible" image).`}
     ]},
   { title:"Proximal map for Poisson data and PnP for photon-limited imaging", points:35,
     intro: R`Let $Y\sim\mathrm{Pois}(x)$ componentwise, i.e. $P\{Y_n=y_n|x\}=\dfrac{x_n^{y_n}e^{-x_n}}{y_n!}$ with $x_n>0$, and let $\hat H$ be a denoiser trained for white Gaussian noise of variance $\sigma^2$.`,
     parts:[
      {q:R`Derive $f(x)=-\log p(y|x)$ up to constants, and show it is convex and separable.`,
       a:R`$f(x)=\sum_n(x_n-y_n\log x_n)+\text{const}$; each term has second derivative $y_n/x_n^2\ge0$, so $f$ is convex and a sum of one-variable functions.`},
      {q:R`Derive the forward-model proximal map $F(v)=\arg\min_x\{f(x)+\tfrac1{2\sigma^2}\|x-v\|^2\}$ in closed form, pixel by pixel.`,
       a:R`For each pixel: $1-\dfrac{y_n}{x_n}+\dfrac{x_n-v_n}{\sigma^2}=0\Rightarrow x_n^2+(\sigma^2-v_n)x_n-\sigma^2y_n=0$, whose positive root is $$[F(v)]_n=\frac{(v_n-\sigma^2)+\sqrt{(v_n-\sigma^2)^2+4\sigma^2y_n}}{2}.$$ (For $y_n=0$ this gives $\max(v_n-\sigma^2,0)$.)`},
      {q:R`Check two limits: $\sigma^2\to0$ and $\sigma^2\to\infty$. Interpret.`,
       a:R`$\sigma^2\to0$: $F(v)\to v$ (the prior term dominates, the map does nothing). $\sigma^2\to\infty$: $F(v)\to y$ (the ML estimate $x=y$; the quadratic tether disappears). In between $F$ pulls $v$ toward the counts $y$ with strength set by $\sigma^2$.`},
      {q:R`Write the PnP algorithm with this $F$ and the denoiser $\hat H$, and state the equilibrium condition.`,
       a:R`<pre>v &larr; y; u &larr; 0
Repeat {
   x &larr; F(v - u)          (pixelwise closed form above)
   v &larr; H&#770;(x + u)
   u &larr; u + (x - v)
}</pre> At convergence $F(x^\ast-u^\ast)=x^\ast=\hat H(x^\ast+u^\ast)$.`},
      {q:R`Why is it appropriate to train $\hat H$ for Gaussian noise even though the data noise is Poisson?`,
       a:R`Inside PnP the denoiser never sees the Poisson data; it sees $x+u$, which is the consensus image plus the split variable's offset, modeled as white Gaussian with variance $\sigma^2=1/a$. The Poisson statistics are handled entirely by $F$. This separation of forward model and prior is the point of the framework.`},
      {q:R`Is $F$ firmly non-expansive? What does that buy you?`,
       a:R`Yes: $F$ is the proximal map of the proper closed convex $f$, and every proximal map is firmly non-expansive. Then $2F-I$ is non-expansive, and if $\hat H$ is also firmly non-expansive, $T=(2\hat H-I)(2F-I)$ is non-expansive and the Mann iteration converges to a fixed point when one exists.`}
     ]}
  ]
 },
 {
  id:"mcmc", name:"Stochastic sampling: Metropolis, Hastings–Metropolis and the Gibbs sampler", prob:55, trend:"stable",
  years:["2016 P4","2018 P4","2019 P4","2023 P5g","2024 P4f–h"],
  evidence: R`Five of ten finals, usually as the last parts of the Markov-chain problem: write the Metropolis algorithm for a Gibbs distribution with a given proposal, show the proposal is symmetric, derive the acceptance probability, and prove the resulting chain satisfies detailed balance with $p(x)$ (2024). The 2019 problem showed that the Gibbs sampler is an ergodic Markov chain with stationary distribution $p(x)$.`,
  concepts:[
   R`Goal: sample $p(x)=\frac1Ze^{-u(x)}$ without knowing $Z$. Metropolis (symmetric proposal $q(w|x)=q(x|w)$): propose $W\sim q(\cdot|x)$, accept with $\alpha=\min\{1,e^{-(u(W)-u(x))}\}$, else stay.`,
   R`Hastings–Metropolis (general $q$): $\alpha=\min\Big\{1,\dfrac{p(w)q(x|w)}{p(x)q(w|x)}\Big\}$. If $q(w|x)=p(w)$ then $\alpha=1$ and the chain is at the target in one step.`,
   R`Proof of correctness: with $P_{i,j}=q(j|i)\alpha(i,j)$ for $j\ne i$, $p_iP_{i,j}=p_jP_{j,i}$ (check the case $u(j)\ge u(i)$; the other is symmetric). DBE $\Rightarrow$ $p$ is stationary; if the chain is irreducible and aperiodic (any rejection gives $P_{i,i}>0$) it is ergodic.`,
   R`Gibbs sampler: pick a random site $J$, replace $x_J$ with a draw from $p_J(x_J|x_{i\ne J})$. Finite state space $K^M$, irreducible (change one coordinate at a time), aperiodic (can redraw the same value), stationary $p(x)$ since $\sum_i\frac1Mp_J(x_J|x_{\setminus J})p(x_{\setminus J})=p(x)$.`,
   R`Proposal variance trade-off: too small gives high acceptance but slow exploration; too large gives many rejections. Simulated annealing samples $p_T\propto e^{-u/T}$ with $T\downarrow0$ to approach the MAP estimate.`
  ],
  problems:[
   { title:"Metropolis single-site sampling of an Ising model", points:35,
     intro: R`Let $X_s\in\{-1,+1\}$ on a finite 2-D lattice with $p(x)=\dfrac1Z\exp\Big\{\beta\sum_{\{s,r\}}x_sx_r\Big\}$, $\beta>0$, sum over 4-neighbor pairs. The proposal picks a site $s$ uniformly at random and flips its sign: $w=x$ except $w_s=-x_s$.`,
     parts:[
      {q:R`Show the proposal is symmetric and compute the energy change $\Delta u=u(w)-u(x)$ for $u(x)=-\beta\sum x_sx_r$ in terms of the local field $m_s=\sum_{r\in\partial s}x_r$.`,
       a:R`Flipping $s$ from $x$ gives $w$ and flipping $s$ again gives $x$ back, each with probability $1/N$: $q(w|x)=q(x|w)$. Only the four terms containing $s$ change: $\Delta u=-\beta(-x_s)m_s+\beta x_sm_s=2\beta x_sm_s$.`},
      {q:R`Write the Metropolis acceptance probability and the algorithm.`,
       a:R`$\alpha=\min\{1,e^{-\Delta u}\}=\min\{1,e^{-2\beta x_sm_s}\}$: a flip that aligns $s$ with its neighbors ($x_sm_s&lt;0$) is always accepted; a flip against them is accepted with probability $e^{-2\beta|m_s|}$. <pre>Repeat {
   s &larr; uniform site;  &Delta;u &larr; 2&beta; x_s m_s
   with probability min{1, exp(-&Delta;u)}: x_s &larr; -x_s
}</pre>`},
      {q:R`Prove that the chain satisfies detailed balance with $p$.`,
       a:R`For $w\ne x$ differing at one site, $P(x\to w)=\tfrac1N\min\{1,e^{-(u(w)-u(x))}\}$. If $u(w)\ge u(x)$: $p(x)P(x\to w)=\tfrac1{ZN}e^{-u(x)}e^{-(u(w)-u(x))}=\tfrac1{ZN}e^{-u(w)}=p(w)P(w\to x)$ since $P(w\to x)=\tfrac1N\cdot1$. The other case is symmetric; configurations differing at more than one site have zero transition probability both ways.`},
      {q:R`Show the chain is irreducible and aperiodic, and conclude it is ergodic with limit $p$.`,
       a:R`Any configuration can be reached from any other by at most $N$ single flips, each accepted with positive probability: irreducible. Rejections give $P(x\to x)>0$ for configurations where some flip raises the energy (all but the two ground states when $\beta>0$, and even those communicate with states having self-loops): aperiodic. Finite, irreducible, aperiodic $\Rightarrow$ ergodic; DBE gives $p$ as the unique stationary distribution.`},
      {q:R`Compare with the Gibbs sampler for the same model: write its update and explain the relation to the Metropolis acceptance rule.`,
       a:R`Gibbs draws $x_s$ from $p(x_s|x_{\partial s})=\dfrac{e^{\beta x_sm_s}}{e^{\beta m_s}+e^{-\beta m_s}}$, i.e. sets $x_s=+1$ with probability $\sigma(2\beta m_s)$ (logistic). Metropolis flips with probability $\min\{1,e^{-2\beta x_sm_s}\}$; both leave $p$ invariant, but Metropolis always accepts moves toward the majority while Gibbs may keep the minority value. Metropolis needs only $\Delta u$, which is what makes it cheap for complicated priors.`},
      {q:R`What happens to mixing as $\beta$ becomes large, and what practical fix does this motivate?`,
       a:R`Large $\beta$ makes flips against a uniform neighborhood exponentially unlikely, so the chain gets stuck in one of the two nearly-all-aligned states and mixing time explodes (critical slowing down). Fixes: simulated annealing / tempering (start at small $\beta$ and increase), or cluster moves (Swendsen–Wang) that flip whole regions at once.`}
     ]},
   { title:"Hastings–Metropolis and the Gibbs sampler", points:30,
     intro: R`Let $p(x)$ be a target distribution on a finite set and $q(w|x)$ a proposal that is not necessarily symmetric.`,
     parts:[
      {q:R`Write the Hastings–Metropolis acceptance probability and show the DBE hold.`,
       a:R`$\alpha(x,w)=\min\Big\{1,\dfrac{p(w)q(x|w)}{p(x)q(w|x)}\Big\}$. If $p(w)q(x|w)\le p(x)q(w|x)$ then $p(x)q(w|x)\alpha(x,w)=p(w)q(x|w)=p(w)q(x|w)\alpha(w,x)$ since $\alpha(w,x)=1$; the opposite case is symmetric. So $p(x)P_{x,w}=p(w)P_{w,x}$.`},
      {q:R`Show that if the proposal is $q(w|x)=p(w)$ (independent of $x$), every proposal is accepted and the chain equals the target after one step.`,
       a:R`$\dfrac{p(w)q(x|w)}{p(x)q(w|x)}=\dfrac{p(w)p(x)}{p(x)p(w)}=1$, so $\alpha=1$. Then $X_1=W\sim p$ regardless of $X_0$.`},
      {q:R`Describe the Gibbs sampler for $x\in\{0,\dots,K-1\}^M$ and show its stationary distribution is $p(x)$.`,
       a:R`Choose $J$ uniformly from $\{0,\dots,M-1\}$, draw $W\sim p_J(\cdot|x_{i\ne J})$ and set $x_J\leftarrow W$. If $X\sim p$, then after one step $P\{X'=x'\}=\sum_J\tfrac1M\,p_J(x'_J|x'_{i\ne J})\,p(x'_{i\ne J})=\sum_J\tfrac1Mp(x')=p(x')$, so $p$ solves the FBE.`},
      {q:R`Show the Gibbs sampler is a special case of Hastings–Metropolis with acceptance probability 1.`,
       a:R`Take $q(w|x)=\tfrac1Mp_J(w_J|x_{\setminus J})$ for $w$ differing from $x$ only at $J$. Then $\dfrac{p(w)q(x|w)}{p(x)q(w|x)}=\dfrac{p(w)\,p_J(x_J|x_{\setminus J})}{p(x)\,p_J(w_J|x_{\setminus J})}=\dfrac{p(w)/p_J(w_J|x_{\setminus J})}{p(x)/p_J(x_J|x_{\setminus J})}=\dfrac{p(x_{\setminus J})}{p(x_{\setminus J})}=1$, since $p(w)=p_J(w_J|x_{\setminus J})p(x_{\setminus J})$.`}
     ]}
  ]
 },
 {
  id:"mlfinal", name:"Maximum likelihood, sufficient statistics and exponential families", prob:55, trend:"rising",
  years:["2022 Q3","2024 P1","2025 P1–P2"],
  evidence: R`The final now tends to open with a warm-up ML problem: the discrete (multinomial) distribution and the simplex (convex? closed? bounded? name?), or i.i.d. Gaussians with unknown mean and variance (natural sufficient statistics $b=\sum y_n$, $S=\sum y_n^2$, minimize over $\mu$ first, then over $\sigma^2$). 2022 also asked to show the multinomial is an exponential family.`,
  concepts:[
   R`Sufficient statistic $T$: $p_\theta(x)=g_\theta(T(x))h(x)$ (factorization). Exponential family: $p_\theta(x)=\exp\{\langle\eta(\theta),T(x)\rangle+d(\theta)+s(x)\}$.`,
   R`Multinomial: $p_\theta(x)=\exp\{\sum_kN_k\log\theta_k\}$, $\eta_k=\log\theta_k$, $T_k=N_k$; ML $\hat\theta_k=N_k/N$ via Lagrange multiplier.`,
   R`The simplex $\Omega=\{\theta\ge0,\sum\theta_k=1\}$ is convex, closed and bounded (compact); the NLL $-\sum N_k\log\theta_k$ is strictly convex when all $N_k>0$, so the ML estimate is unique.`,
   R`i.i.d. $N(\mu,\sigma^2)$: $l(\theta)=\sum_n\big[\tfrac{(y_n-\mu)^2}{2\sigma^2}+\tfrac12\log(2\pi\sigma^2)\big]$; $\hat\mu=b/N$ independent of $\sigma^2$; $\hat\sigma^2=S/N-(b/N)^2$.`,
   R`Exponential distribution $p(y)=\tfrac1\mu e^{-y/\mu}$: $\hat\mu=\bar y$, unbiased, variance $\mu^2/N$; Poisson: $\hat\lambda=\bar y$. Bias, variance and MSE definitions from the fact sheet.`
  ],
  problems:[
   { title:"ML for i.i.d. exponential and Poisson observations", points:30,
     intro: R`Let $Y_0,\dots,Y_{N-1}$ be i.i.d. exponential with density $p_\mu(y)=\tfrac1\mu e^{-y/\mu}u(y)$, $\mu>0$.`,
     parts:[
      {q:R`Derive the negative log-likelihood $l(\mu)$ and identify the natural sufficient statistic.`,
       a:R`$l(\mu)=N\log\mu+\tfrac1\mu\sum_ny_n=N\log\mu+S/\mu$ with $S=\sum_ny_n$. Writing $p_\mu(y)=\exp\{-\tfrac1\mu S-N\log\mu\}$ shows an exponential family with $\eta=-1/\mu$ and $T=S$.`},
      {q:R`Find $\hat\mu$ and show that $l$ has a unique minimizer.`,
       a:R`$l'(\mu)=N/\mu-S/\mu^2=0\Rightarrow\hat\mu=S/N=\bar y$. $l''(\hat\mu)=-N/\hat\mu^2+2S/\hat\mu^3=N/\hat\mu^2>0$, and $l\to\infty$ as $\mu\to0$ or $\infty$, so it is the unique minimizer.`},
      {q:R`Compute the bias, variance and MSE of $\hat\mu$.`,
       a:R`$E[\hat\mu]=\mu$ (unbiased); $\mathrm{Var}(Y_n)=\mu^2$ so $\mathrm{Var}(\hat\mu)=\mu^2/N$ and MSE $=\mu^2/N$.`},
      {q:R`Now suppose instead $Y_n\sim\mathrm{Pois}(\lambda)$ i.i.d. Show the family is exponential, find $\hat\lambda$ and its variance.`,
       a:R`$p_\lambda(y)=\prod_n\dfrac{\lambda^{y_n}e^{-\lambda}}{y_n!}=\exp\{S\log\lambda-N\lambda-\sum_n\log y_n!\}$: $\eta=\log\lambda$, $T=S$. $l=N\lambda-S\log\lambda+c$, $l'=N-S/\lambda=0\Rightarrow\hat\lambda=S/N$, unbiased with variance $\lambda/N$.`}
     ]},
   { title:"ML estimation of an AR(1) process", points:30,
     intro: R`Let $X_0=0$ and $X_n=\rho X_{n-1}+E_n$ for $n=1,\dots,N$, with $E_n$ i.i.d. $N(0,\sigma^2)$, $|\rho|&lt;1$, and $\theta=(\rho,\sigma^2)$.`,
     parts:[
      {q:R`Write $p_\theta(x_1,\dots,x_N|x_0)$ and the negative log-likelihood $l(\theta)$.`,
       a:R`Conditionally $X_n|X_{n-1}\sim N(\rho x_{n-1},\sigma^2)$, so $p_\theta(x|x_0)=\prod_{n=1}^N\dfrac1{\sqrt{2\pi\sigma^2}}\exp\{-(x_n-\rho x_{n-1})^2/2\sigma^2\}$ and $$l(\theta)=\frac N2\log(2\pi\sigma^2)+\frac1{2\sigma^2}\sum_{n=1}^N(x_n-\rho x_{n-1})^2 .$$`},
      {q:R`Show the family is exponential and identify the natural sufficient statistics.`,
       a:R`Expand the square: $\sum(x_n-\rho x_{n-1})^2=S_{00}-2\rho S_{01}+\rho^2S_{11}$ with $S_{00}=\sum x_n^2$, $S_{01}=\sum x_nx_{n-1}$, $S_{11}=\sum x_{n-1}^2$. So $p_\theta=\exp\{-\tfrac1{2\sigma^2}S_{00}+\tfrac\rho{\sigma^2}S_{01}-\tfrac{\rho^2}{2\sigma^2}S_{11}-\tfrac N2\log(2\pi\sigma^2)\}$: natural statistics $(S_{00},S_{01},S_{11})$.`},
      {q:R`Minimize over $\rho$ for fixed $\sigma^2$ and show the result does not depend on $\sigma^2$.`,
       a:R`$\partial l/\partial\rho=\tfrac1{\sigma^2}(-S_{01}+\rho S_{11})=0\Rightarrow\hat\rho=S_{01}/S_{11}=\dfrac{\sum x_nx_{n-1}}{\sum x_{n-1}^2}$, the least-squares regression coefficient; $\sigma^2$ cancels.`},
      {q:R`Substitute $\hat\rho$ and minimize over $\sigma^2$.`,
       a:R`$l(\hat\rho,\sigma^2)=\tfrac N2\log(2\pi\sigma^2)+\tfrac{R}{2\sigma^2}$ with $R=\sum(x_n-\hat\rho x_{n-1})^2$; $\partial/\partial\sigma^2=\tfrac N{2\sigma^2}-\tfrac R{2\sigma^4}=0\Rightarrow\hat\sigma^2=R/N$, the mean squared prediction error.`},
      {q:R`How does this generalize to an AR($P$) model, and what are the estimates in matrix form?`,
       a:R`With $z_n=[x_{n-1},\dots,x_{n-P}]$: $\hat h=\hat R^{-1}\hat b$ where $\hat R=\sum_nz_n^tz_n$ and $\hat b=\sum_nz_n^tx_n$ (the normal equations), and $\hat\sigma^2=\tfrac1N\sum_n(x_n-z_n\hat h)^2$. For Gaussian innovations, ML and least squares coincide.`},
      {q:R`Is $\hat\rho$ unbiased? Explain briefly.`,
       a:R`Not exactly: $\hat\rho$ is a ratio of random sums and the regressor $x_{n-1}$ is itself random and correlated with earlier noise, giving a small finite-sample bias of order $1/N$ (toward zero). It is consistent: $\hat\rho\to\rho$ as $N\to\infty$.`}
     ]}
  ]
 },
 {
  id:"mmfinal", name:"Surrogate functions and majorization–minimization (final version)", prob:25, trend:"falling",
  years:["2017 P2","2019 P1"],
  evidence: R`Two finals (Huber symmetric-bound surrogate in 2017; MM monotonicity and fixed-point proofs in 2019). It has since migrated to the midterm, but the EM problem is itself an MM method and the $Q$-function sketch/property questions of 2023 draw on the same picture.`,
  concepts:[
   R`Surrogate definition and the MM inequality chain $f(x^{k+1})\le q(x^{k+1};x^k)\le q(x^k;x^k)=f(x^k)$.`,
   R`Symmetric-bound surrogate $\rho(\Delta;\Delta')=\dfrac{\rho'(\Delta')}{2\Delta'}\Delta^2$ (plus a constant for tangency); maximum-curvature surrogate uses $\max\rho''$.`,
   R`Huber $\rho(x)=x^2/2$ for $|x|&lt;T$, $T|x|-T^2/2$ otherwise: $\rho'(x)/x=1$ inside and $T/|x|$ outside; the symmetric-bound surrogate has curvature $\min(1,T/|x'|)$.`,
   R`Advantage of the symmetric bound: smaller curvature than the maximum-curvature bound for large $|\Delta'|$, hence larger steps; it exists only where $\rho'(\Delta')/\Delta'$ is non-increasing.`,
   R`Fixed point of MM $\Rightarrow$ $\nabla f=0$ (gradients agree at the touching point), hence global min for convex $f$.`
  ],
  problems:[
   { title:"Symmetric-bound surrogate for a generalized Gaussian potential", points:25,
     intro: R`Let $\rho(\Delta)=|\Delta|^p/p$ with $1&lt;p&lt;2$.`,
     parts:[
      {q:R`Compute $\rho'(\Delta)$ and $\rho'(\Delta)/\Delta$, and verify the condition needed for the symmetric-bound method.`,
       a:R`$\rho'(\Delta)=\operatorname{sign}(\Delta)|\Delta|^{p-1}$ and $\rho'(\Delta)/\Delta=|\Delta|^{p-2}$, which is even and strictly decreasing in $|\Delta|$ for $p&lt;2$; this is exactly the condition for the parabola $\tfrac{\rho'(\Delta')}{2\Delta'}\Delta^2+c$ to majorize $\rho$.`},
      {q:R`Write the surrogate $q(\Delta;\Delta')$ with the constant chosen so that $q(\Delta';\Delta')=\rho(\Delta')$.`,
       a:R`$q(\Delta;\Delta')=\tfrac12|\Delta'|^{p-2}\Delta^2+\big(\tfrac1p-\tfrac12\big)|\Delta'|^p$.`},
      {q:R`Why does the surrogate fail at $\Delta'=0$, and how is this handled in practice?`,
       a:R`As $\Delta'\to0$ the curvature $|\Delta'|^{p-2}\to\infty$ (the potential has infinite curvature at the origin for $p&lt;2$), so no finite parabola works. In practice one clamps $|\Delta'|\ge\epsilon$ or uses a smoothed potential such as $(\Delta^2+\epsilon^2)^{p/2}$.`},
      {q:R`Using this surrogate, give the MM update for $f(x)=\tfrac12(x-y)^2+\beta\sum_r\rho(x-x_r)$.`,
       a:R`With weights $w_r=|x'-x_r|^{p-2}$: $x\leftarrow\dfrac{y+\beta\sum_rw_rx_r}{1+\beta\sum_rw_r}$. Neighbors far from $x'$ receive small weight, which produces edge preservation; each step decreases $f$.`}
     ]}
  ]
 },
 {
  id:"mrf", name:"MRFs and Gibbs distributions: conditional distributions, Ising/Potts, choice of potential", prob:25, trend:"falling",
  years:["2017 P4","2020 Q4"],
  evidence: R`Two finals asked to derive the conditional distribution of a pixel given its neighbors from a Gibbs distribution (Ising model in 2017; continuous pairwise prior in 2020 with a discussion of quadratic versus absolute-value potentials). The MRF tutorial notes linked on the course page cover exactly this material.`,
  concepts:[
   R`Gibbs distribution $p(x)=\frac1z\exp\{-\sum_{c}V_c(x_c)\}$ over cliques; pairwise form $\sum_{\{s,r\}}b_{s,r}\rho(x_s-x_r)$. Hammersley–Clifford: Gibbs $\iff$ MRF (positivity).`,
   R`Conditional of one pixel: only cliques containing $s$ survive, $p(x_s|x_{\partial s})=\dfrac{\exp\{-\sum_{r\in\partial s}b_{s,r}\rho(x_s-x_r)\}}{\int\exp\{-\sum_{r\in\partial s}b_{s,r}\rho(x_s'-x_r)\}dx_s'}$; the partition function cancels.`,
   R`Ising/Potts: $p(x_s=m|x_{\partial s})\propto\exp\{-\beta v(m,x_{\partial s})\}$ with $v$ the number of disagreeing neighbors; $\beta>0$ smooth blobs, $\beta&lt;0$ checkerboards, $\beta=0$ i.i.d.`,
   R`Quadratic potential $\rho=\Delta^2/2$: Gaussian, closed-form MAP, but over-smooths edges. $\rho=|\Delta|$: convex, edge-preserving, non-differentiable at 0 (needs prox/ADMM). $|\Delta|^p$, $1&lt;p&lt;2$: compromise. Non-convex potentials preserve edges best but lose uniqueness.`
  ],
  problems:[
   { title:"Potts model conditionals and a Gibbs sampler", points:30,
     intro: R`Let $X_s\in\{0,\dots,M-1\}$ on a finite lattice have the Potts distribution $p(x)=\dfrac1{z(\beta)}\exp\Big\{-\beta\sum_{\{r,s\}\in\mathcal C}\delta(x_r\ne x_s)\Big\}$, and let $v(m,x_{\partial s})=\sum_{r\in\partial s}\delta(m\ne x_r)$.`,
     parts:[
      {q:R`Derive $p(x_s=m\,|\,x_r,\,r\ne s)$.`,
       a:R`Terms not involving $s$ cancel between numerator and denominator: $p(x_s=m|x_{r\ne s})=\dfrac{\exp\{-\beta v(m,x_{\partial s})\}}{\sum_{k=0}^{M-1}\exp\{-\beta v(k,x_{\partial s})\}}$, which depends only on the neighbors, so $X$ is an MRF.`},
      {q:R`For the 4-neighbor lattice and $M=2$, sketch $p(x_s=1|x_{\partial s})$ versus $v(1,x_{\partial s})\in\{0,\dots,4\}$ for $\beta=1$.`,
       a:R`With $v_1=v(1,\cdot)$ and $v_0=4-v_1$: $p=\dfrac{e^{-\beta v_1}}{e^{-\beta v_1}+e^{-\beta(4-v_1)}}=\dfrac1{1+e^{\beta(2v_1-4)}}$, a decreasing logistic curve through $0.5$ at $v_1=2$: about $0.98,0.88,0.5,0.12,0.02$ for $v_1=0,\dots,4$.`},
      {q:R`Describe how a typical sample looks for $\beta=3$, $\beta=0$ and $\beta=-2$.`,
       a:R`$\beta=3$: large homogeneous regions (strong smoothing, few boundaries). $\beta=0$: i.i.d. uniform labels, salt-and-pepper noise. $\beta=-2$: disagreement is rewarded, giving checkerboard-like patterns where neighbors alternate labels.`},
      {q:R`Write the Gibbs sampler for this model and state why its stationary distribution is $p(x)$.`,
       a:R`<pre>Repeat {
   pick site s uniformly at random
   for each m: w_m &larr; exp(-&beta; v(m, x_&part;s));  normalize w
   draw x_s from the discrete distribution w
}</pre> Each step draws from the exact conditional, so $p$ solves the full balance equations; the chain is irreducible (any configuration is reachable one site at a time) and aperiodic (a site can be redrawn to the same value), hence ergodic with limit $p$.`},
      {q:R`Compare the priors $\rho(\Delta)=\tfrac12\Delta^2$ and $\rho(\Delta)=|\Delta|$ for continuous images: one advantage and one disadvantage of each.`,
       a:R`Quadratic: Gaussian prior with closed-form MAP and cheap gradient/ICD updates, but it penalizes large differences heavily and blurs edges. Absolute value (TV-like): convex and edge-preserving with sparse gradients, but non-differentiable at zero so it needs proximal/ADMM methods and produces staircasing in smooth regions.`}
     ]}
  ]
 },
 {
  id:"icdl1", name:"ICD with an L1 prior, shrinkage and fixed points", prob:15, trend:"falling",
  years:["2018 P1"],
  evidence: R`Asked once (2018): strict convexity of $\|y-Ax\|^2+\|x\|_1$, existence and uniqueness, the closed-form ICD update via a shrinkage function, and whether an ICD fixed point is a global minimum. The shrinkage operator itself returned on the 2025 midterm.`,
  concepts:[
   R`$f(x)=\tfrac12\|y-Ax\|^2+\lambda\|x\|_1$: strictly convex if $A$ has full column rank; convex always.`,
   R`Coordinate update: minimizing over $x_i$ with residual $e=y-Ax$ gives $x_i\leftarrow S_{\lambda/\|A_{*,i}\|^2}\Big(x_i+\dfrac{A_{*,i}^te}{\|A_{*,i}\|^2}\Big)$.`,
   R`Because the non-smooth part $\lambda\|x\|_1$ is separable across coordinates, coordinate-wise optimality implies global optimality for this convex problem; so an ICD fixed point is a global minimizer.`
  ],
  problems:[
   { title:"ICD for the LASSO cost", points:25,
     intro: R`Let $f(x)=\tfrac12\|y-Ax\|^2+\lambda\|x\|_1$ with $A\in\mathbb R^{M\times N}$ of full column rank and $\lambda>0$.`,
     parts:[
      {q:R`Prove $f$ is strictly convex and has a unique global minimizer.`,
       a:R`$\tfrac12\|y-Ax\|^2$ has Hessian $A^tA\succ0$, so it is strictly convex; $\lambda\|x\|_1$ is convex; the sum is strictly convex. $f$ is continuous and coercive ($f\ge\tfrac{\sigma_{\min}^2}{2}(\|x\|-\|y\|/\sigma_{\min})^2$), so a minimizer exists, and strict convexity makes it unique.`},
      {q:R`Derive the ICD update for coordinate $i$ in closed form.`,
       a:R`Fix all other coordinates and let $e=y-Ax$. As a function of the new value $x_i+\alpha$: $g(\alpha)=\tfrac12\|e-\alpha A_{*,i}\|^2+\lambda|x_i+\alpha|=\tfrac12\|A_{*,i}\|^2\big(\alpha-\tfrac{A_{*,i}^te}{\|A_{*,i}\|^2}\big)^2+\lambda|x_i+\alpha|+c$. Substituting $t=x_i+\alpha$ this is $\tfrac{\|A_{*,i}\|^2}{2}(t-\tilde t)^2+\lambda|t|$ with $\tilde t=x_i+A_{*,i}^te/\|A_{*,i}\|^2$, minimized by the soft threshold: $$x_i\leftarrow S_{\lambda/\|A_{*,i}\|^2}\Big(x_i+\frac{A_{*,i}^te}{\|A_{*,i}\|^2}\Big),\qquad e\leftarrow e-(x_i^{new}-x_i^{old})A_{*,i}.$$`},
      {q:R`If $x^\ast$ is a fixed point of a full ICD pass, is it the global minimizer? Justify.`,
       a:R`Yes. At a fixed point each coordinate minimizes $f$ with the others held fixed, i.e. $0\in\partial_{x_i}f(x^\ast)$ for every $i$. Since the non-smooth term is separable, the subdifferential of $f$ is the product of the coordinate subdifferentials, so $0\in\partial f(x^\ast)$ and, by convexity, $x^\ast$ is a global minimizer (the unique one).`}
     ]}
  ]
 },
 {
  id:"genrv", name:"Generating random variables (inverse-CDF method)", prob:15, trend:"falling",
  years:["2022 Q2"],
  evidence: R`Asked once on the 2022 final (and again on the 2026 ECE 60146 midterm 2): given a continuous strictly increasing CDF $F$, generate $X'=F^{-1}(U)$ and prove it has CDF $F$. Short and easy points if it appears.`,
  concepts:[
   R`If $U\sim\mathrm{Uniform}(0,1)$ and $F$ is continuous strictly increasing, $X=F^{-1}(U)$ has CDF $F$: $P\{X\le\lambda\}=P\{U\le F(\lambda)\}=F(\lambda)$.`,
   R`Exponential: $X=-\mu\ln(1-U)$. Discrete: compare $U$ with cumulative sums of the pmf. Gaussian vector $N(0,R)$: $X=E\Lambda^{1/2}W$ with $W\sim N(0,I)$ (or Cholesky). Gibbs distributions: MCMC because $F^{-1}$ is unavailable.`
  ],
  problems:[
   { title:"Inverse-CDF sampling", points:15,
     intro: R`Let $U\sim\mathrm{Uniform}(0,1)$.`,
     parts:[
      {q:R`Give a method to generate $X$ with CDF $F$ (continuous, strictly increasing) and prove it works.`,
       a:R`Set $X=F^{-1}(U)$. Since $F$ is increasing, $\{F^{-1}(U)\le\lambda\}=\{U\le F(\lambda)\}$, so $P\{X\le\lambda\}=F(\lambda)$.`},
      {q:R`Specialize to the exponential distribution with mean $\mu$ and to the Rayleigh distribution $F(x)=1-e^{-x^2/2\sigma^2}$.`,
       a:R`Exponential: $F(x)=1-e^{-x/\mu}\Rightarrow X=-\mu\ln(1-U)$ (or $-\mu\ln U$). Rayleigh: $X=\sigma\sqrt{-2\ln(1-U)}$.`},
      {q:R`How do you generate a draw from a discrete distribution $\pi_0,\dots,\pi_{M-1}$, and from $N(0,R)$?`,
       a:R`Discrete: form cumulative sums $c_m=\sum_{k\le m}\pi_k$ and return the smallest $m$ with $U\le c_m$ (this is the inverse of the step CDF). Gaussian: $R=E\Lambda E^t$, draw $W\sim N(0,I)$ (e.g. Box–Muller) and set $X=E\Lambda^{1/2}W$; then $E[XX^t]=E\Lambda E^t=R$.`}
     ]}
  ]
 },
 {
  id:"wordsfinal", name:"Explain-in-words / \"emotional equations\" (final version)", prob:20, trend:"rising",
  years:["2023 P1"],
  evidence: R`The 2023 final opened with a 25-point prose question on the detailed balance equations. Given the 2023–2025 midterms also had such questions, expect one on any recent-style exam.`,
  concepts:[
   R`Detailed balance: probability flux $i\to j$ equals flux $j\to i$; implies stationarity and reversibility.`,
   R`$Q(\theta;\theta')$: expected complete-data log-likelihood, a minorizer of the true log-likelihood; EM climbs it.`,
   R`Metropolis acceptance $\min(1,e^{-\Delta U})$: always accept downhill, sometimes accept uphill so the chain explores.`,
   R`$T=(2H-I)(2F-I)$: reflect through the denoiser and the data term; fixed points of $T$ are PnP equilibria.`
  ],
  problems:[
   { title:"Interpret in prose (75 words or fewer each)", points:25,
     intro: R`Explain the meaning and significance of each equation.`,
     parts:[
      {q:R`$\pi_iP_{i,j}=\pi_jP_{j,i}$`,
       a:R`Detailed balance: in steady state the probability flowing from state $i$ to $j$ equals the flow from $j$ to $i$. Summing over $i$ shows $\pi$ is stationary, and it means the chain looks statistically identical run backwards (reversible). It is the tool used to design MCMC samplers: choose transitions that balance against the target distribution and the target is automatically stationary.`},
      {q:R`$Q(\theta;\theta')=E[\log p_\theta(y,X)\,|\,Y=y,\theta']$`,
       a:R`The EM $Q$-function: the complete-data log-likelihood averaged over the hidden data using the current guess $\theta'$. Up to a constant it lies below the true log-likelihood and touches it at $\theta'$, so maximizing it can only increase the likelihood. It converts an impossible sum-inside-a-log into the easy complete-data problem, at the price of iterating.`},
      {q:R`$\alpha=\min\{1,\exp(-[u(w)-u(x)])\}$`,
       a:R`The Metropolis acceptance probability. Proposals that lower the energy are always taken; proposals that raise it are taken with probability $e^{-\Delta u}$, so the walk can climb out of valleys and explore. This single rule makes the chain satisfy detailed balance with the Gibbs distribution $e^{-u}/Z$ without ever computing $Z$.`}
     ]}
  ]
 }
 ]
};
})();
