window.EXAMDB = window.EXAMDB || {};
(function(){
const R = String.raw;
const C = window.EXAMDB.ece60146 = window.EXAMDB.ece60146 || {id:"ece60146", code:"ECE 60146 / BME 64600", title:"Deep Learning", exams:{}};
C.exams.mt2 = {
 id:"mt2", name:"Midterm 2", years:"Spring 2020 – Spring 2026 (7 exams; all that exist)",
 format:"5–6 problems, 75 min, closed book, closed notes (open book 120 min in 2020–2022)",
 mockCount:5, mockTime:"75 minutes",
 notes: R`<b>What the seven Midterm 2s look like.</b> Midterm 2 is about training and generative modeling. Training/validation/test curves with overfitting-vs-capacity diagnoses appear in 5 of 7 exams; stochastic gradient descent (batch size, gradient noise, momentum) in 4 of 7; back-propagation through convolution blocks and their adjoints in 5 of 7; GANs / Bayes classifiers / likelihood ratios in 3 of 7. The 2026 exam pivoted toward generative and sequence models: inverse-CDF sampling, autoregressive factorization and text generation, preconditioned gradient descent (Newton step), self-attention as denoising, and transformer pre-training with masked attention. Expect that new material to persist.`,
 categories:[
 {
  id:"train", name:"Training, validation, testing: overfitting vs. capacity, regularization, early stopping", prob:85, trend:"stable",
  years:["2020 Q4","2022 Q4","2023 P1","2024 P1","2025 P3"],
  evidence: R`Five of seven Midterm 2s (and Midterm 1 in 2026). The plots: validation loss much larger than training loss (capacity too high / too little data: reduce model, add data, regularize, dropout, early stop); both losses similar and high (capacity too low: bigger model, train longer); loss versus number of training pairs. Also: which subset is used by SGD (training), which epoch to keep (minimum validation loss), why a test set is needed (validation was used for selection), the effect of 10x more data, and L1 regularization as effective model-order reduction.`,
  concepts:[
   R`Three disjoint sets: training (used by SGD), validation (model selection, early stopping, hyperparameters), test (final unbiased evaluation, touched once). Same loss function, different ground truth data.`,
   R`Case 1 (overfitting): $L_V\gg L_T$, validation loss turns up after some epoch. Diagnosis: capacity too high for the data. Fixes: more data or augmentation, L1/L2 regularization, dropout, early stopping at the validation minimum, smaller model.`,
   R`Case 2 (underfitting): $L_V\approx L_T$ and both keep decreasing or plateau high. Diagnosis: capacity too low (data sufficient). Fixes: more layers/channels/expressive blocks, train longer; keep the final epoch.`,
   R`More training data: $L_T$ increases, $L_V$ decreases, gap shrinks; more data is always better but slower. Loss versus number of training pairs: curves converge as $N$ grows.`,
   R`Regularization as MAP: L2 (Gaussian prior on weights) shrinks; L1 (Laplacian prior) drives weights to exactly zero, effectively reducing model order. Dropout randomly removes nodes during training (an ensemble/noise regularizer).`
  ],
  problems:[
   { title:"Diagnose three training runs", points:30,
     intro: R`You train a DNN with training, validation and test splits. Interpret each observation and prescribe actions.`,
     parts:[
      {q:R`Run A: training loss keeps falling to near zero; validation loss falls for 5 epochs then rises steadily. What is happening, which parameters do you keep, and name three fixes.`,
       a:R`Overfitting: the model's capacity exceeds what the data can constrain, so after epoch 5 it fits training noise. Keep the epoch-5 parameters (validation minimum, i.e. early stopping). Fixes: more data or augmentation; L1/L2 regularization or dropout; reduce model size.`},
      {q:R`Run B: training and validation losses track each other closely and both plateau at a high value. Diagnosis and action?`,
       a:R`Underfitting: the data suffices for the model but the model lacks capacity (or has not trained long enough). Increase capacity (more layers, channels, larger kernels, more expressive blocks), train longer, check the learning rate. Keep the final epoch.`},
      {q:R`Run C: you plot final training and validation loss versus the number of training pairs $N$; the two curves are far apart at small $N$ and approach each other as $N$ grows, but you only have the small-$N$ data. Diagnosis and action?`,
       a:R`Not enough training data for this model. Collect more data or augment; otherwise reduce parameters or regularize so the curves meet at the available $N$.`},
      {q:R`Which subset does SGD use, which is used to pick the epoch, and why do you still need the third subset?`,
       a:R`SGD uses only the training set. The validation set picks the epoch and hyperparameters. Because those choices were tuned on the validation loss, it is optimistically biased; the test set, never used for any decision, gives an unbiased estimate to report.`},
      {q:R`You cannot change the architecture in Run A. Explain how L1 regularization helps and how it differs from L2.`,
       a:R`Add $\beta\|\theta\|_1$ to the loss: this is MAP estimation with a Laplacian prior; the non-smooth penalty pushes unneeded weights exactly to zero, effectively lowering the model order. L2 ($\beta\|\theta\|^2$, Gaussian prior) shrinks all weights toward zero smoothly without making them exactly sparse.`},
      {q:R`Predict what happens to the Run-A curves if the training set is enlarged 10x.`,
       a:R`Training loss increases (more data to fit), validation loss decreases, its minimum shifts to a later epoch, and the gap narrows.`}
     ]}
  ]
 },
 {
  id:"backprop", name:"Back-propagation: adjoint gradients of convolution blocks, forward/backward functions", prob:75, trend:"stable",
  years:["2020 Q2","2021 Q2","2022 Q2","2024 P5","2025 P4"],
  evidence: R`Five of seven. Versions: two-layer chain with $A_i=\nabla_zf_i$, $B_i=\nabla_\theta f_i$ and $\epsilon_k=-2(x_k-f_\theta(y_k))$; the forward function $F(z,w)$ and backward function $G(\epsilon,z,w)$ of a conv layer with output shapes; the circulant matrix of a "same"-boundary convolution and its transpose (reversed kernel); convolution vs. correlation and commutativity; the observation that for a linear layer the back-propagated $\delta$ does not depend on $z$.`,
  concepts:[
   R`Layer $z_{i+1}=f_{i,\theta_i}(z_i)$ with Jacobians $A_i=\nabla_{z_i}f_i$ (w.r.t. input) and $B_i=\nabla_{\theta_i}f_i$ (w.r.t. parameters). Forward perturbation: $\delta\hat x=A_1A_0\delta z_0$, $\delta\hat x=A_1B_0\delta\theta_0$.`,
   R`MSE loss for pair $k$: $\epsilon_k=-2(x_k-f_\theta(y_k))$; back-propagation computes $g_{\theta_1}=B_1^t\epsilon_k$, $\delta_1=A_1^t\epsilon_k$, $g_{\theta_0}=B_0^t\delta_1$, and the total gradient is the (average) sum over $k$.`,
   R`Conv layer forward $x=F(z,w)=z*w$ (valid): output $(N-k+1)^2$ per channel. Backward $G(\epsilon,z,w)$ returns $\delta=\nabla_z^t\epsilon$ (convolution of zero-padded $\epsilon$ with the flipped kernel, output the size of $z$) and $g_w=\nabla_w^t\epsilon$ (correlation of $\epsilon$ with $z$, output the size of $w$). $G_\delta$ does not depend on $z$ for a linear layer.`,
   R`"Same" circular convolution: $A_{i,j}=w_{i-j}$ (circulant); $A^t$ has $[A^t]_{i,j}=w_{j-i}$: circular convolution with $w_{-n}$. Convolution is commutative ($z*w=w*z$); correlation is not ($\delta_n\circ\delta_{n-1}=\delta_{n-1}$ but reversed gives $\delta_{n+1}$).`,
   R`Nonlinear layer $\sigma(Az+b)$: $\nabla_z=\mathrm{diag}(\sigma'(Az+b))A$, so the backward map depends on the forward activations, which must be stored.`
  ],
  problems:[
   { title:"Back-propagation through a two-layer network with ReLU", points:35,
     intro: R`Let $\hat x=f_\theta(y)=W_2\,\sigma(W_1y+b_1)+b_2$ with $y\in\mathbb R^{N_0}$, $W_1\in\mathbb R^{N_1\times N_0}$, $W_2\in\mathbb R^{N_2\times N_1}$, $\sigma$ the elementwise ReLU, and loss $L=\tfrac1K\sum_k\|x_k-f_\theta(y_k)\|^2$. Write $a_1=W_1y+b_1$, $z_1=\sigma(a_1)$.`,
     parts:[
      {q:R`Give the Jacobians $A_1=\nabla_{z_1}\hat x$, $A_0=\nabla_ya_1$ and $D=\nabla_{a_1}z_1$, with shapes.`,
       a:R`$A_1=W_2$ ($N_2\times N_1$); $A_0=W_1$ ($N_1\times N_0$); $D=\mathrm{diag}(\mathbb 1\{a_1>0\})$ ($N_1\times N_1$), the ReLU mask.`},
      {q:R`For one training pair define $\epsilon=-\tfrac2K(x_k-\hat x)$. Give the back-propagated errors $\delta_2$ (at $\hat x$), $\delta_1$ (at $a_1$) and $\delta_0$ (at $y$).`,
       a:R`$\delta_2=\epsilon$; $\delta_1=D\,W_2^t\epsilon$ (transpose of $W_2$, then zero out inactive units); $\delta_0=W_1^t\delta_1$.`},
      {q:R`Give the gradients with respect to $W_2,b_2,W_1,b_1$ for that pair (as matrices/vectors of the same shapes).`,
       a:R`$\nabla_{W_2}=\delta_2z_1^t$ ($N_2\times N_1$ outer product), $\nabla_{b_2}=\delta_2$, $\nabla_{W_1}=\delta_1y^t$, $\nabla_{b_1}=\delta_1$. Sum over the $K$ pairs for the full gradient.`},
      {q:R`Count the multiplies of one backward pass for one pair and compare with the forward pass.`,
       a:R`Backward: $W_2^t\epsilon$ costs $N_2N_1$, the mask is free, $W_1^t\delta_1$ costs $N_1N_0$, and the outer products cost $N_2N_1+N_1N_0$: about $2(N_2N_1+N_1N_0)$. Forward: $N_1N_0+N_2N_1$. The backward pass is roughly twice the forward pass, independent of the number of parameters being millions.`},
      {q:R`Why must $a_1$ (or the mask) be stored during the forward pass? Would this be needed if $\sigma$ were the identity?`,
       a:R`Because $D$ depends on the sign of $a_1$; without it $\delta_1$ cannot be formed. If $\sigma$ were the identity the layer would be linear, $D=I$, and the backward map $\epsilon\mapsto W_1^tW_2^t\epsilon$ would not depend on the input at all.`},
      {q:R`Explain in words the "forward function / backward function" pair that a software framework needs for each layer.`,
       a:R`Forward $F$: compute the layer output from its input and parameters (and cache what the backward pass needs). Backward $G$: given the error arriving at the output, return the error to pass to the previous layer (multiply by the adjoint of the input Jacobian) and the parameter gradient (adjoint of the parameter Jacobian times the error). Chaining $G$'s from the loss back to the input is back-propagation; it is what SGD needs.`}
     ]},
   { title:"Adjoints of average pooling and max pooling", points:25,
     intro: R`Let $y\in\mathbb R^8$. Average pooling with window and stride 2 gives $x_n=\tfrac12(y_{2n}+y_{2n+1})$, $n=0..3$; max pooling gives $x_n=\max(y_{2n},y_{2n+1})$. The loss is $L=\tfrac1{2}\|t-x\|^2$ for a target $t\in\mathbb R^4$.`,
     parts:[
      {q:R`Write average pooling as $x=Ay$ and give $A^t$. Interpret $\delta=A^t\epsilon$.`,
       a:R`$A$ is $4\times8$ with rows $\tfrac12[1,1,0,\dots]$ shifted by two: $A_{n,m}=\tfrac12$ for $m\in\{2n,2n+1\}$. $A^t$ is $8\times4$ and $\delta_m=\tfrac12\epsilon_{\lfloor m/2\rfloor}$: each pooled-output error is split equally back to the two inputs it averaged (an "un-pooling" by replication and scaling).`},
      {q:R`Is max pooling linear? Write its Jacobian $\nabla_yx$ at a point where no ties occur, and the adjoint gradient.`,
       a:R`Not linear (max is not additive). Locally it is a selection: $\partial x_n/\partial y_m=1$ if $m=m^\ast_n$ (the argmax within window $n$), else 0. The adjoint routes each $\epsilon_n$ to the position of the maximum: $\delta_{m^\ast_n}=\epsilon_n$, all other $\delta_m=0$. Frameworks store the argmax indices in the forward pass for this reason.`},
      {q:R`For $y=[3,1,\;0,4,\;2,2,\;5,-1]$ and $t=[2,2,2,2]$ compute $x$, $\epsilon=x-t$, and $\delta$ for both pooling types.`,
       a:R`Average: $x=[2,2,2,2]$, $\epsilon=0$, $\delta=0$. Max: $x=[3,4,2,5]$ (tie in window 2: take the first, $m=4$), $\epsilon=[1,2,0,3]$, $\delta=[1,0,\;0,2,\;0,0,\;3,0]$.`},
      {q:R`Why does max pooling produce sparse gradients, and what are the practical consequences for training?`,
       a:R`Only one input per window receives gradient; the others get exactly zero regardless of their values, so at most a fraction $1/(\text{window size})$ of the activations below a max-pool layer are updated by a given sample. This gives strong, sparse signals (good for detecting the presence of a feature) but slower learning of non-maximal units; average pooling spreads the gradient smoothly. Strided convolutions have since replaced pooling in many architectures.`}
     ]}
  ]
 },
 {
  id:"sgd", name:"Stochastic gradient descent: batch size, gradient noise, epochs, momentum, Adam", prob:75, trend:"stable",
  years:["2021 Q4–Q5","2023 P2","2024 P3","2025 P2"],
  evidence: R`Four of seven. Asks: define an epoch; gradient of a random sample $G$ has mean $\mu=\nabla L/K$-like average and covariance $R$; a batch average has mean $\mu$ and covariance $R/K_b$, so doubling the batch reduces the noise standard deviation by $\sqrt2$; small batches: faster updates, exploration, escape local minima, less memory, but noisy hunting; large batches for smooth losses / final exploitation; momentum pseudo-code and its steady state $v\to\alpha d$; $\gamma=0$ is plain SGD.`,
  concepts:[
   R`Per-sample gradient $g_k=\nabla_\theta L_k(\theta)=A_k^t(x_k-f_\theta(y_k))$ (for $L_k=\tfrac12\|x_k-f\|^2$). Picking $k$ uniformly gives a random vector $G$ with $p(g)=\tfrac1K\sum_k\delta(g-g_k)$, mean $\mu=\tfrac1K\sum_kg_k$ (the full-batch gradient), covariance $R=\tfrac1K\sum_k(g_k-\mu)(g_k-\mu)^t$.`,
   R`Batch of $K_b$ i.i.d. draws: $\hat G=\tfrac1{K_b}\sum G_i$ has mean $\mu$ and covariance $R/K_b$; noise standard deviation $\propto1/\sqrt{K_b}$, so doubling $K_b$ divides it by $\sqrt2$.`,
   R`Epoch $=$ one pass through the training set ($K/K_b$ updates). Small batch: cheap fast updates, more updates per epoch, noise helps exploration and escaping local minima, less memory; but the final solution hunts around the minimum. Large batch: accurate gradient, good for smooth losses and final exploitation, parallel hardware; but can get stuck and costs memory.`,
   R`Momentum: $v\leftarrow\gamma v+\alpha(1-\gamma)d$, $\theta\leftarrow\theta+v$ with $d=-\nabla L$; $\gamma=0$ is plain SGD; for constant $d$, $v\to\alpha d$ (a low-pass filter on the gradient), which smooths noise and accelerates along consistent directions. Adam adds per-parameter normalization by the running RMS of the gradient (momentum + diagonal preconditioning).`,
   R`Learning-rate schedules: large steps early (exploration), decay later (exploitation).`
  ],
  problems:[
   { title:"Gradient noise and batch size", points:30,
     intro: R`Let $L(\theta)=\sum_{k=0}^{K-1}L_k(\theta)$ with $L_k=\tfrac12\|x_k-f_\theta(y_k)\|^2$, $A_k=\nabla_\theta f_\theta(y_k)\in\mathbb R^{N_x\times p}$, and $g_k=\nabla_\theta L_k$ as a column vector. Let $G$ be the gradient of a uniformly random training pair, and $\hat G$ the average of $K_b$ independent draws (with replacement).`,
     parts:[
      {q:R`Compute $g_k$ and write the density of $G$.`,
       a:R`$g_k=-A_k^t(x_k-f_\theta(y_k))$ (sign convention: gradient of the loss). $p(g)=\tfrac1K\sum_k\delta(g-g_k)$, a mixture of point masses.`},
      {q:R`Compute the mean $\mu$ and covariance $R$ of $G$.`,
       a:R`$\mu=\tfrac1K\sum_kg_k=\tfrac1K\nabla L(\theta)$; $R=\tfrac1K\sum_k(g_k-\mu)(g_k-\mu)^t$.`},
      {q:R`Compute the mean and covariance of $\hat G$.`,
       a:R`$E[\hat G]=\mu$ (unbiased for the scaled full gradient). Independence gives $\mathrm{Cov}(\hat G)=\tfrac1{K_b^2}\sum_{i}R=\tfrac{R}{K_b}$.`},
      {q:R`If the batch size is doubled, by what factor does the gradient noise standard deviation change? How many updates per epoch are there for $K=50{,}000$ and $K_b=100$?`,
       a:R`Standard deviation scales as $1/\sqrt{K_b}$, so it drops by $\sqrt2\approx1.41$. Updates per epoch: $K/K_b=500$.`},
      {q:R`A loss surface is "bumpy" (many local minima) early in training and "smooth" near the solution. Which batch size do you use in each phase and why?`,
       a:R`Small batches early: noisy gradients help jump out of local minima (exploration) and each update is cheap, giving more updates per unit time. Large batches late (or a decayed step size): low-variance gradients pinpoint the minimum (exploitation) without hunting around it.`},
      {q:R`Write SGD with momentum and find $\lim v$ when $d$ is constant. What is the special case $\gamma=0$?`,
       a:R`<pre>v &larr; 0
Repeat { for each batch S_b {
   d &larr; -&nabla;L(&theta;; S_b)
   v &larr; &gamma; v + &alpha;(1-&gamma;) d
   &theta; &larr; &theta; + v } }</pre> At equilibrium $v=\gamma v+\alpha(1-\gamma)d\Rightarrow v=\alpha d$: the step approaches $\alpha$ times the negative gradient, but the recursion low-pass filters noisy gradients and builds speed along consistent directions. $\gamma=0$ gives plain SGD with step $\alpha$.`}
     ]}
  ]
 },
 {
  id:"gan", name:"GANs, Bayes classifiers, likelihood ratios and Nash equilibria", prob:55, trend:"stable",
  years:["2022 Q5","2023 P3","2025 P5–P6"],
  evidence: R`Three of seven. Asks: joint density of a fair coin choosing real vs. fake, Bayes' rule for $P\{\text{real}|y\}=\dfrac{p_r}{p_r+p_g}$ (the optimal discriminator); Bayes classifier with priors $\pi_0,\pi_1$ in terms of the likelihood ratio $R(y)=p_1/p_0$ and the threshold $\tfrac12$ on the posterior; properties of likelihood ratios ($E[R(Y)]=1$, change of measure, convex mixtures, strict convexity of $E[(1+R)\log(1+R)]$ with minimizer $R\equiv1$); Nash equilibrium equations for generator/discriminator losses, $D(\theta_g)=\arg\min_{\theta_d}d$, zero-sum games.`,
  concepts:[
   R`Likelihood ratio $R(y)=\tilde p(y)/p(y)$ (needs $\tilde p$ absolutely continuous w.r.t. $p$): $E_p[R(Y)]=1$; $E_{\tilde p}[f(\tilde Y)]=E_p[f(Y)R(Y)]$ (importance sampling / change of measure); convex combinations of valid ratios are valid; $R\equiv2$ is invalid.`,
   R`Fair-coin real/fake mixture: $p(c,y)=\tfrac12p_r(y)\delta(c=R)+\tfrac12p_g(y)\delta(c=F)$; optimal discriminator $f^\ast(y)=P\{C=R|y\}=\dfrac{p_r(y)}{p_r(y)+p_g(y)}=\dfrac1{1+p_g/p_r}$. With priors $\pi_0,\pi_1$ and $R=p_1/p_0$: $P\{C=0|y\}=\dfrac{\pi_0}{\pi_0+R(y)\pi_1}$; Bayes classifier picks class 0 iff this exceeds $\tfrac12$, i.e. $R(y)&lt;\pi_0/\pi_1$; it minimizes the probability of error.`,
   R`Strict convexity of $C(R)=E[(1+R)\log(1+R)]$ (since $h(x)=(1+x)\log(1+x)$ has $h''=1/(1+x)>0$) gives a unique minimizer at $R\equiv1$ ($\tilde p=p$): the generator's goal.`,
   R`Nash equilibrium: $\theta_g^\ast=\arg\min_{\theta_g}g(\theta_g,\theta_d^\ast)$ and $\theta_d^\ast=\arg\min_{\theta_d}d(\theta_g^\ast,\theta_d)$ simultaneously; with $D(\theta_g)=\arg\min_{\theta_d}d(\theta_g,\theta_d)$ the generator solves $\min_{\theta_g}g(\theta_g,D(\theta_g))$. Zero-sum if $g=-d$ (chess, go). GAN training alternates gradient steps on the two losses; the discriminator loss is a cross-entropy on real/fake labels.`
  ],
  problems:[
   { title:"Optimal discriminator and Bayes classifier", points:30,
     intro: R`A GAN generates fake vectors $\tilde Y\sim p_{\theta_g}(y)$; reference data are $Y\sim p_r(y)$. Separately, a two-class problem has $P\{C=0\}=\pi_0$, $P\{C=1\}=\pi_1=1-\pi_0$, $Y|C=c\sim p_c(y)$, and $R(y)=p_1(y)/p_0(y)$.`,
     parts:[
      {q:R`Flip a fair coin $C\in\{R,F\}$ and draw $Y$ from $p_r$ or $p_{\theta_g}$ accordingly. Write $p(c,y)$ and $P\{C=R|Y=y\}$.`,
       a:R`$p(c,y)=\tfrac12p_r(y)\delta(c=R)+\tfrac12p_{\theta_g}(y)\delta(c=F)$. Bayes: $P\{C=R|y\}=\dfrac{\tfrac12p_r(y)}{\tfrac12p_r(y)+\tfrac12p_{\theta_g}(y)}=\dfrac{p_r(y)}{p_r(y)+p_{\theta_g}(y)}=\dfrac1{1+p_{\theta_g}(y)/p_r(y)}$.`},
      {q:R`What discriminator output corresponds to a perfect generator, and how would you train a network $f_{\theta_d}(y)$ to approximate this function?`,
       a:R`If $p_{\theta_g}=p_r$ then $P\{C=R|y\}=\tfrac12$ everywhere: the discriminator cannot do better than guessing. Train $f_{\theta_d}$ with the binary cross-entropy loss on labeled real/fake samples; the minimizer of the expected cross-entropy is exactly the posterior probability.`},
      {q:R`For the two-class problem, compute $p(y)$ and $P\{C=0|Y=y\}$ in terms of $R(y)$.`,
       a:R`$p(y)=\pi_0p_0(y)+\pi_1p_1(y)$ and $P\{C=0|y\}=\dfrac{\pi_0p_0}{\pi_0p_0+\pi_1p_1}=\dfrac{\pi_0}{\pi_0+\pi_1R(y)}$.`},
      {q:R`Give the Bayes classifier (minimum probability of error) as a threshold on $R(y)$, and specialize to $\pi_0=\pi_1$.`,
       a:R`Choose class 0 iff $P\{C=0|y\}\ge\tfrac12\iff\pi_0\ge\pi_1R(y)\iff R(y)\le\pi_0/\pi_1$; otherwise class 1. For equal priors: class 1 iff $R(y)>1$, i.e. pick the class with the larger likelihood.`},
      {q:R`Show that for any valid likelihood ratio $E_{p}[R(Y)]=1$ and that $R(y)\equiv2$ is not valid.`,
       a:R`$E_p[R]=\int\dfrac{p_1(y)}{p_0(y)}p_0(y)dy=\int p_1=1$. If $R\equiv2$ then $p_1=2p_0$ would integrate to 2, impossible.`}
     ]},
   { title:"Nash equilibrium of generator and discriminator", points:25,
     intro: R`Let $g(\theta_g,\theta_d)$ and $d(\theta_g,\theta_d)$ be the generator and discriminator losses and define $D(\theta_g)=\arg\min_{\theta_d}d(\theta_g,\theta_d)$.`,
     parts:[
      {q:R`Write the Nash equilibrium conditions.`,
       a:R`$\theta_g^\ast=\arg\min_{\theta_g}g(\theta_g,\theta_d^\ast)$ and $\theta_d^\ast=\arg\min_{\theta_d}d(\theta_g^\ast,\theta_d)$: neither player can improve by changing only its own parameters.`},
      {q:R`Interpret $D(\theta_g)$ and write the equilibrium for $\theta_g$ alone.`,
       a:R`$D(\theta_g)$ is the best-response discriminator for a given generator. Substituting, $\theta_g^\ast=\arg\min_{\theta_g}g(\theta_g,D(\theta_g))$: the generator minimizes its loss against the best possible discriminator.`},
      {q:R`What is the special case $g=-d$ called, and give a real-world example.`,
       a:R`A zero-sum game (one player's loss is the other's gain): chess, go, poker between two players.`},
      {q:R`Why is GAN training with alternating gradient steps harder than ordinary minimization? Name a failure mode.`,
       a:R`It is a saddle-point (min–max) problem rather than a minimization: alternating steps can cycle or diverge, and there is no single loss that decreases monotonically. Mode collapse (the generator produces a few outputs that fool the current discriminator) and vanishing discriminator gradients are typical failures.`},
      {q:R`Show $h(x)=(1+x)\log(1+x)$ is strictly convex for $x\ge0$ and explain why this implies the loss $C(R)=E[(1+R(Y))\log(1+R(Y))]$ over valid likelihood ratios has the unique minimizer $R\equiv1$.`,
       a:R`$h'=\log(1+x)+1$, $h''=1/(1+x)>0$. For valid ratios $R_a,R_b$ and $\lambda\in(0,1)$, $\lambda R_a+(1-\lambda)R_b$ is valid and $C(\lambda R_a+(1-\lambda)R_b)&lt;\lambda C(R_a)+(1-\lambda)C(R_b)$ by pointwise strict convexity of $h$, so $C$ is strictly convex on the convex set of valid ratios and any local minimum is the unique global one. Minimizing subject to $E[R]=1$ with a Lagrange multiplier gives $h'(R)=$ const, so $R$ is constant, hence $R\equiv1$: the generator matches the data distribution.`}
     ]}
  ]
 },
 {
  id:"seq", name:"Autoregressive models, transformers, self-attention and pre-training", prob:55, trend:"new",
  years:["2026 P2","2026 P4–P5"],
  evidence: R`New in 2026 and covering three of five problems: chain-rule factorization $p_n(y_n)=\prod_ig_i(x_i|y_{i-1})$ and sequential sampling (how a transformer generates text); self-attention $Z=\mathrm{softmax}(QQ^t/\sqrt p)Q$ on rows $a,a,b,b$ (approximations $\|a\|^2\approx p\sigma^2$, $\langle a,b\rangle\approx0$, block softmax with $\tfrac12$ entries, denoising interpretation); pre-training with shifted target sequence, masked attention, cross-entropy, context window $P$ and $O(P^2)$ cost.`,
  concepts:[
   R`Chain rule: $p_n(y_n)=g_n(x_n|y_{n-1})p_{n-1}(y_{n-1})=\prod_{i=0}^ng_i(x_i|y_{i-1})$ with $y_{-1}=\emptyset$. Sampling: for $i=0..n$ draw $X_i\sim g_i(\cdot|Y_{i-1})$ and append. A transformer outputs $g_i$ (a softmax over tokens) given the prefix; sample or take the argmax, append, repeat.`,
   R`Self-attention: $Z=\mathrm{softmax}(QK^t/\sqrt{p})V$ (row-wise softmax). For i.i.d. $N(0,\sigma^2I)$ rows in $\mathbb R^p$: $\|a\|^2\approx p\sigma^2$, $\langle a,b\rangle\approx0$, so $QQ^t/\sqrt p$ has $\sqrt p\sigma^2$ on blocks of similar rows and 0 elsewhere; for large $p$ the softmax becomes an averaging matrix over similar rows ($\tfrac12$ entries for pairs), so $Z\approx Q$ with noise averaged out: attention denoises by averaging tokens that resemble each other.`,
   R`Cost: the $P\times P$ attention matrix makes computation and memory scale as $O(P^2)$ in the context window $P$ (times $p$).`,
   R`Pre-training an autoregressive model: input sequence $x_0..x_{P-1}$, target sequence shifted by one ($x_1..x_P$); causal (masked) attention so position $n$ sees only $x_i$, $i\le n$; one-hot targets with cross-entropy loss (maximum likelihood of the next token); positional encoding is needed because attention is permutation invariant.`,
   R`Inverse-CDF sampling supplies the random draws for generative models; latent-variable generators map $z\sim N(0,I)$ through a network.`
  ],
  problems:[
   { title:"Autoregressive generation and self-attention as adaptive averaging", points:35,
     intro: R`Let $X_n\in\mathbb R^p$ be a sequence of random vectors, $Y_n=[X_0,\dots,X_n]$, $p_n(y_n)$ the density of $Y_n$, and $g_n(x_n|y_{n-1})$ the conditional density of $X_n$ given $Y_{n-1}$ (with $Y_{-1}=\emptyset$).`,
     parts:[
      {q:R`Show $p_n(y_n)=g_n(x_n|y_{n-1})p_{n-1}(y_{n-1})$ and hence $p_n(y_n)=\prod_{i=0}^ng_i(x_i|y_{i-1})$.`,
       a:R`$p_n(y_n)=p(x_n,y_{n-1})=p(x_n|y_{n-1})p(y_{n-1})=g_n(x_n|y_{n-1})p_{n-1}(y_{n-1})$ by the definition of conditional density; iterating down to $p_0(y_0)=g_0(x_0|\emptyset)$ gives the product.`},
      {q:R`Given a sampler for each $g_i$, write an algorithm that produces $Y_n\sim p_n$, and explain how a transformer language model uses it. What is "teacher forcing"?`,
       a:R`<pre>Y &larr; []
for i = 0..n {  X_i ~ g_i( . | Y );  Y &larr; [Y, X_i] }</pre> The transformer, given the prefix $Y_{i-1}$, outputs a softmax over the vocabulary ($g_i$); a token is sampled (or the argmax taken), appended, and the process repeats. Teacher forcing: during training the prefix is the true data, not the model's own samples, so all positions can be trained in parallel from one pass.`},
      {q:R`Let $Q\in\mathbb R^{5\times p}$ have rows $a,a,a,b,c$ where $a,b,c$ are i.i.d. $N(0,\sigma^2I_p)$ with $p$ large. Approximate $QQ^t/\sqrt p$ and the row-wise softmax.`,
       a:R`$\|a\|^2\approx p\sigma^2$ and cross inner products $\approx0$, so $QQ^t/\sqrt p\approx\sqrt p\,\sigma^2\,\mathrm{blockdiag}(J_3,1,1)$ where $J_3$ is the $3\times3$ all-ones block. For large $p$ the softmax of each row puts equal weight on the large entries: rows 1–3 become $[\tfrac13,\tfrac13,\tfrac13,0,0]$, row 4 becomes $[0,0,0,1,0]$, row 5 becomes $[0,0,0,0,1]$.`},
      {q:R`Compute $Z=\mathrm{softmax}(QQ^t/\sqrt p)Q$ for the noisy version with rows $a+\eta w_1,\;a+\eta w_2,\;a+\eta w_3,\;b+\eta w_4,\;c+\eta w_5$ ($\eta$ small, $w_i$ i.i.d. $N(0,\sigma^2I)$). By what factor is the noise variance reduced in each row?`,
       a:R`The similarity structure is unchanged, so $Z\approx[a+\tfrac\eta3(w_1+w_2+w_3)$ (three times)$,\;b+\eta w_4,\;c+\eta w_5]$. Rows in the cluster of three have their noise variance reduced by a factor 3 (averaging three independent noises); the singleton rows are unchanged. Attention averages each token with the tokens that resemble it: content-adaptive denoising, with more averaging for more redundant tokens.`},
      {q:R`Why is the scaling by $\sqrt p$ needed in the softmax argument? What would happen without it for large $p$?`,
       a:R`Inner products of $p$-dimensional vectors have magnitude of order $p\sigma^2$ (diagonal) with fluctuations of order $\sqrt p\sigma^2$; dividing by $\sqrt p$ keeps the logits of order $\sqrt p\sigma^2$ rather than $p\sigma^2$. Without it the softmax saturates to a hard one-hot for large $p$, gradients vanish, and no averaging occurs; with it the softmax stays soft enough to train.`},
      {q:R`How do computation and memory of self-attention scale with the context window $P$, and what does that imply for long documents?`,
       a:R`As $O(P^2)$ (times the embedding dimension) because the attention matrix has one entry per pair of positions. Doubling the context quadruples the cost, which motivates sparse/local attention, key-value caching during generation, and windowed context.`}
     ]},
   { title:"Pre-training an autoregressive transformer", points:25,
     intro: R`Training data is a long token sequence $x_n\in\{0,\dots,M-1\}$. The model is an encoder (tokens to vectors), transformer layers with masked attention, a decoder (vectors to logits), and a cross-entropy loss against one-hot targets.`,
     parts:[
      {q:R`If the input sequence A is $x_0,\dots,x_5$, what is the target sequence B, and what is the context window $P$?`,
       a:R`B is the sequence shifted by one: $x_1,\dots,x_6$ (predict the next token at every position). $P=6$.`},
      {q:R`Why is attention masked during pre-training?`,
       a:R`So that the prediction at position $n$ uses only $x_i$ for $i\le n$; otherwise the network could copy the answer $x_{n+1}$ from the input and would learn nothing useful for generation.`},
      {q:R`Why cross-entropy against one-hot targets?`,
       a:R`Minimizing cross-entropy is maximum-likelihood estimation of the next-token distribution $g_n(x_{n+1}|y_n)$; the one-hot encoding makes the negative log-likelihood of the observed token equal to the cross-entropy.`},
      {q:R`Why does a transformer need positional encodings?`,
       a:R`Self-attention is permutation invariant (it only uses similarities between token vectors), so without positional information the model could not distinguish word order.`},
      {q:R`Describe inference (generation) once the model is trained, and the cost of generating $T$ tokens with context $P$.`,
       a:R`Feed the prompt, take the softmax at the last position, sample a token, append it, and repeat (autoregressive sampling). Each step attends over up to $P$ positions, so generating $T$ tokens costs about $O(TP^2)$ (or $O(TP)$ per step with cached keys/values).`}
     ]}
  ]
 },
 {
  id:"mapreg", name:"ML vs. MAP estimation of network parameters: MSE, cross-entropy and regularizers as priors", prob:40, trend:"falling",
  years:["2020 Q3","2021 Q3","2022 Q3"],
  evidence: R`Three of the first three Midterm 2s (later moved to Midterm 1): Gaussian noise model $X_k=f_\theta(Y_k)+W_k$ gives $-\log p_\theta(x|y)=\tfrac1{2\sigma^2}\sum\|x_k-f_\theta(y_k)\|^2+$const, so ML $=$ minimizing MSE; a Laplacian prior on $\theta$ gives MAP $=$ MSE $+\beta\|\theta\|_1$ with $\beta=\sigma_w^2/\sigma$; how to implement each in standard software; advantages of ML vs. MAP.`,
  concepts:[
   R`$X_k=f_\theta(Y_k)+W_k$, $W_k\sim N(0,\sigma_w^2I)$: $p_\theta(x_k|y_k)=(2\pi\sigma_w^2)^{-p/2}\exp\{-\|x_k-f_\theta(y_k)\|^2/2\sigma_w^2\}$; over $K$ i.i.d. pairs, $-\log p_\theta(x|y)=\tfrac1{2\sigma_w^2}\sum_k\|x_k-f_\theta(y_k)\|^2+\text{const}$. ML $\Leftrightarrow$ minimize MSE. Laplacian noise $\Rightarrow$ MAE (L1) loss. Classification with one-hot labels $\Rightarrow$ cross-entropy.`,
   R`Bayesian: $p(x,y,\theta)=p(\theta)\prod_kp(x_k|y_k,\theta)p(y_k)$. Prior $p(\theta)\propto\exp\{-\|\theta\|_1/\sigma\}$ gives MAP $=\arg\min\sum_k\|x_k-f_\theta(y_k)\|^2+\beta\|\theta\|_1$ with $\beta=2\sigma_w^2/\sigma$ (L1 weight regularization); Gaussian prior gives L2 weight decay. Implement as MSE loss plus a penalty term (or the optimizer's weight-decay option).`,
   R`ML: no prior needed, mostly unbiased, asymptotically efficient, best with plenty of data; overfits with little data. MAP: lower variance if the prior is right, better with few data and many parameters, but needs a prior and a hyperparameter.`
  ],
  problems:[
   { title:"From noise and prior models to loss functions", points:30,
     intro: R`Training pairs $(X_k,Y_k)$, $k=0,\dots,K-1$, are i.i.d. with $X_k=f_\theta(Y_k)+W_k$ and $Y_k\sim p(y)$.`,
     parts:[
      {q:R`With $W_k\sim N(0,\sigma_w^2I)$ write $p_\theta(x_k|y_k)$, the joint $p_\theta(x,y)$ of all pairs, and the negative log-likelihood.`,
       a:R`$p_\theta(x_k|y_k)=(2\pi\sigma_w^2)^{-p/2}\exp\{-\tfrac1{2\sigma_w^2}\|x_k-f_\theta(y_k)\|^2\}$; $p_\theta(x,y)=\prod_kp_\theta(x_k|y_k)p(y_k)$; $-\log p_\theta(x,y)=\tfrac{Kp}2\log(2\pi\sigma_w^2)+\tfrac1{2\sigma_w^2}\sum_k\|x_k-f_\theta(y_k)\|^2-\sum_k\log p(y_k)$.`},
      {q:R`What loss function computes the ML estimate in standard deep-learning software? Justify.`,
       a:R`The MSE loss $\tfrac1K\sum_k\|x_k-f_\theta(y_k)\|^2$: it equals the negative log-likelihood up to a positive scale and terms independent of $\theta$, so both have the same minimizer.`},
      {q:R`Repeat b) if the noise components are i.i.d. Laplacian with density $\tfrac1{2b}e^{-|w|/b}$.`,
       a:R`$-\log p=\tfrac1b\sum_k\|x_k-f_\theta(y_k)\|_1+$const, so ML is the mean-absolute-error (L1) loss, which is more robust to outliers.`},
      {q:R`Take the Bayesian view with $p(\theta)=\tfrac1{z}\exp\{-\|\theta\|_1/\sigma\}$. Write $p(x,y,\theta)$ and the MAP estimate as an optimization.`,
       a:R`$p(x,y,\theta)=p(\theta)\prod_kp(x_k|y_k,\theta)p(y_k)$. $\hat\theta_{MAP}=\arg\min_\theta\Big\{\tfrac1{2\sigma_w^2}\sum_k\|x_k-f_\theta(y_k)\|^2+\tfrac1\sigma\|\theta\|_1\Big\}=\arg\min_\theta\Big\{\sum_k\|x_k-f_\theta(y_k)\|^2+\beta\|\theta\|_1\Big\}$ with $\beta=2\sigma_w^2/\sigma$.`},
      {q:R`How do you implement d) in software, and what would change for a Gaussian prior on $\theta$?`,
       a:R`Add $\beta\sum_i|\theta_i|$ to the MSE loss (L1 regularization; $\beta$ is a hyperparameter tuned on validation data). A Gaussian prior gives $\beta\|\theta\|^2$: L2 regularization, usually available as the optimizer's weight-decay option.`},
      {q:R`Give two advantages of MAP over ML and two of ML over MAP.`,
       a:R`MAP: lower-variance estimates when the prior is accurate; works with less data relative to the number of parameters (regularization prevents overfitting). ML: needs no prior or hyperparameter; is (mostly) unbiased and asymptotically efficient with plenty of data.`}
     ]}
  ]
 },
 {
  id:"precond", name:"Preconditioned gradient descent and the Newton step (least squares)", prob:35, trend:"new",
  years:["2026 P3"],
  evidence: R`New in 2026: for $f(x)=\tfrac12\|y-Ax\|^2$ compute $d=A^t(y-Ax)$, show $f(x+\alpha d)&lt;f(x)$ and $f(x+\alpha Md)&lt;f(x)$ for small $\alpha$ and positive-definite $M$, compute the Hessian, and show one step with $M=$ Hessian$^{-1}$, $\alpha=1$ lands on the least-squares solution. (Note: the Hessian is $A^tA$; the posted key wrote $AA^t$.)`,
  concepts:[
   R`$f(x)=\tfrac12\|y-Ax\|^2$: $\nabla f=-A^t(y-Ax)$, descent direction $d=A^t(y-Ax)$, Hessian $\nabla^2f=A^tA$ (positive definite when $A$ has full column rank).`,
   R`First-order: $f(x+\alpha\tilde d)\approx f(x)+\alpha\nabla f^t\tilde d=f(x)-\alpha d^tM d=f(x)-\alpha\|d\|_M^2&lt;f(x)$ for any $M\succ0$ and small $\alpha>0$: preconditioning preserves descent.`,
   R`Newton: $M=(A^tA)^{-1}$, $\alpha=1$: $x\leftarrow x+(A^tA)^{-1}A^t(y-Ax)=(A^tA)^{-1}A^ty$, the least-squares solution in one step. For general smooth $f$, Newton's method converges quadratically near a minimum but each step costs a linear solve; quasi-Newton and diagonal (Adam-like) preconditioners approximate it.`
  ],
  problems:[
   { title:"Preconditioners for ridge regression and Gauss–Newton for a nonlinear model", points:30,
     intro: R`Let $f(x)=\tfrac12\|y-Ax\|^2+\tfrac\lambda2\|x\|^2$ with $A\in\mathbb R^{M\times N}$, $\lambda>0$. Preconditioned gradient descent uses $x\leftarrow x-\alpha M\nabla f(x)$ with $M\succ0$.`,
     parts:[
      {q:R`Compute $\nabla f$ and the Hessian $H$, and show $f$ is strictly convex for every $A$.`,
       a:R`$\nabla f=-A^t(y-Ax)+\lambda x$ (column form), $H=A^tA+\lambda I\succeq\lambda I\succ0$: strictly convex, unique minimizer $x^\ast=(A^tA+\lambda I)^{-1}A^ty$.`},
      {q:R`Show that for any $M\succ0$ and small $\alpha>0$, $d=-M\nabla f(x)$ is a descent direction.`,
       a:R`$f(x+\alpha d)\approx f(x)+\alpha\nabla f^td=f(x)-\alpha\nabla f^tM\nabla f&lt;f(x)$ whenever $\nabla f\ne0$, because $M\succ0$.`},
      {q:R`Compare three preconditioners: $M_1=I$, the Jacobi $M_2=\mathrm{diag}(H)^{-1}$, and $M_3=H^{-1}$. For each give the iteration matrix $I-\alpha MH$, the condition for convergence, and the number of steps to converge exactly when possible.`,
       a:R`$M_1$: $I-\alpha H$, converges iff $\alpha&lt;2/\lambda_{\max}(H)$; slow when $\kappa(H)=\tfrac{\lambda_{\max}(A^tA)+\lambda}{\lambda_{\min}(A^tA)+\lambda}$ is large. $M_2$: $I-\alpha D^{-1}H$ with $D_{ii}=\|A_{*,i}\|^2+\lambda$; equalizes column scales (helps when columns of $A$ have very different norms) but not correlations; converges iff $\alpha&lt;2/\lambda_{\max}(D^{-1}H)$. $M_3$: $I-\alpha I=(1-\alpha)I$; with $\alpha=1$ it converges in one step (Newton), at the cost of an $O(N^3)$ solve.`},
      {q:R`Show that $\lambda$ itself acts as a preconditioner of sorts: how does $\kappa(H)$ change with $\lambda$, and what is the price?`,
       a:R`$\kappa(H)=\dfrac{\sigma_{\max}^2+\lambda}{\sigma_{\min}^2+\lambda}$ decreases toward 1 as $\lambda$ grows (regularization makes the problem better conditioned, so gradient descent converges faster). The price is bias: $x^\ast$ is shrunk toward zero and differs from the least-squares solution.`},
      {q:R`Now replace $Ax$ by a nonlinear model $f_\theta(y)$ with Jacobian $J=\nabla_\theta f_\theta(y)$ ($N_x\times p$), loss $\tfrac12\|x-f_\theta(y)\|^2$. Derive the Gauss–Newton step and explain its relation to preconditioning.`,
       a:R`Linearize $f_{\theta+\Delta}\approx f_\theta+J\Delta$; minimizing $\tfrac12\|x-f_\theta-J\Delta\|^2$ over $\Delta$ gives $\Delta=(J^tJ)^{-1}J^t(x-f_\theta)$. Since the gradient is $-J^t(x-f_\theta)$, this is preconditioned gradient descent with $M=(J^tJ)^{-1}$, an approximation of the Hessian inverse that ignores second derivatives of $f_\theta$; adding $\lambda I$ gives Levenberg–Marquardt.`},
      {q:R`Why do deep-learning optimizers use diagonal preconditioners (Adam, RMSProp) rather than $(J^tJ)^{-1}$?`,
       a:R`With $p\sim10^8$ parameters, $J^tJ$ is $p\times p$: impossible to store or invert, and $J$ itself has $N_xp$ entries per sample. Diagonal preconditioners estimated from running gradient statistics cost $O(p)$, capture per-parameter scale differences (the main source of ill-conditioning across layers), and combine with momentum.`}
     ]}
  ]
 },
 {
  id:"genrv", name:"Generating random variables: inverse-CDF method and sampling for generative models", prob:30, trend:"new",
  years:["2026 P1"],
  evidence: R`New in 2026 (40 points): properties of a continuous strictly increasing CDF (range $(0,1)$, one-to-one, invertible), $F(F^{-1}(y))=y$, and the proof that $X=F^{-1}(U)$ with $U\sim U(0,1)$ has CDF $F$; why this is useful (sampling from any distribution).`,
  concepts:[
   R`CDF $F(x)=P\{X\le x\}$: non-decreasing, right-continuous, limits 0 and 1. If continuous and strictly increasing, its range is $(0,1)$ (endpoints not attained, e.g. Gaussian), it is one-to-one onto $(0,1)$, and $F^{-1}:(0,1)\to\mathbb R$ exists with $F(F^{-1}(y))=y$ and $F^{-1}(F(x))=x$.`,
   R`Inverse-CDF sampling: $U\sim U(0,1)$, $X=F^{-1}(U)$: $P\{X\le\lambda\}=P\{F^{-1}(U)\le\lambda\}=P\{U\le F(\lambda)\}=F(\lambda)$.`,
   R`Examples: exponential $X=-\mu\ln(1-U)$; Cauchy $X=\tan(\pi(U-\tfrac12))$; discrete distributions via cumulative sums; Gaussian via Box–Muller (no closed-form $F^{-1}$); $N(\mu,R)$ via $\mu+E\Lambda^{1/2}W$.`,
   R`Generative models: draw a latent $z\sim N(0,I)$ (using such samplers) and map through a network; autoregressive models sample each token from a softmax via inverse CDF on the cumulative probabilities.`
  ],
  problems:[
   { title:"Sampling methods: inverse CDF, Box–Muller and rejection", points:30,
     intro: R`Let $U,U_1,U_2$ be independent $\mathrm{Uniform}(0,1)$ random variables.`,
     parts:[
      {q:R`Let $F$ be a continuous strictly increasing CDF. Prove that $X=F^{-1}(U)$ has CDF $F$, and state what property of $F$ makes $F^{-1}$ exist on $(0,1)$.`,
       a:R`$P\{X\le\lambda\}=P\{F^{-1}(U)\le\lambda\}=P\{U\le F(\lambda)\}=F(\lambda)$ (monotonicity, then the uniform CDF). Continuity plus strict monotonicity make $F$ a bijection from $\mathbb R$ onto $(0,1)$, so the inverse exists there; the endpoints 0 and 1 are not attained.`},
      {q:R`Derive samplers for (i) the Laplacian density $\tfrac1{2b}e^{-|x|/b}$ and (ii) the logistic CDF $F(x)=1/(1+e^{-x})$.`,
       a:R`(i) $F(x)=\tfrac12e^{x/b}$ for $x&lt;0$ and $1-\tfrac12e^{-x/b}$ for $x\ge0$, so $X=b\ln(2U)$ if $U&lt;\tfrac12$, $X=-b\ln(2(1-U))$ otherwise; equivalently $X=-b\,\mathrm{sign}(U-\tfrac12)\ln(1-2|U-\tfrac12|)$. (ii) $X=\ln\dfrac{U}{1-U}$ (the logit).`},
      {q:R`The Gaussian CDF has no closed-form inverse. Show that $X_1=\sqrt{-2\ln U_1}\cos(2\pi U_2)$, $X_2=\sqrt{-2\ln U_1}\sin(2\pi U_2)$ are independent $N(0,1)$ (Box–Muller). Hint: work in polar coordinates.`,
       a:R`For independent $N(0,1)$ variables the squared radius $R^2=X_1^2+X_2^2$ is exponential with mean 2 ($\chi^2_2$) and the angle $\Theta$ is uniform on $[0,2\pi)$, independent of $R$. By part a), $R^2=-2\ln U_1$ is exponential with mean 2 and $\Theta=2\pi U_2$ is uniform; converting back to Cartesian coordinates gives the stated pair with joint density $\tfrac1{2\pi}e^{-(x_1^2+x_2^2)/2}$, which factors, so they are independent standard normals.`},
      {q:R`Explain rejection sampling for a density $p$ with $p(x)\le c\,q(x)$ using a proposal $q$ you can sample, prove it works, and give the acceptance rate.`,
       a:R`Draw $X\sim q$ and $U\sim\mathrm{Uniform}(0,1)$; accept if $U\le\dfrac{p(X)}{c\,q(X)}$, else repeat. $P\{\text{accept},X\in dx\}=q(x)\dfrac{p(x)}{cq(x)}dx=\dfrac{p(x)}{c}dx$, so the accepted samples have density $p$ and the acceptance probability is $1/c$: efficient only if $c$ is near 1 (the proposal must hug the target), which fails badly in high dimensions and motivates MCMC.`},
      {q:R`Where do these samplers appear inside a modern generative model?`,
       a:R`Latent codes $z\sim N(0,I)$ for GANs, VAEs and diffusion models come from Box–Muller-type Gaussian generators; the next token of an autoregressive model is drawn from a softmax by inverse CDF on cumulative probabilities (with temperature or top-$k$ modifying $F$); diffusion sampling adds Gaussian noise at every step.`}
     ]}
  ]
 },
 {
  id:"cnn2", name:"CNN parameter counting (Midterm 2 version)", prob:30, trend:"stable",
  years:["2025 P1"],
  evidence: R`The standard two-layer valid-convolution counting problem appeared on Midterm 2 in 2025 ($5\times5$ kernels, $1\to8\to3$ channels: $N_1=124$, $N_2=120$, 811 parameters). See Midterm 1 for the full concept list.`,
  concepts:[
   R`Valid: $N_{out}=N_{in}-k+1$; parameters per layer $k^2C_{in}C_{out}+C_{out}$; pooling has none; strides reduce size by the stride factor.`
  ],
  problems:[
   { title:"CNN with pooling and a fully connected head", points:25,
     intro: R`Input $32\times32\times3$. Layer 1: $3\times3$ conv, $3\to16$, "same", ReLU. Layer 2: $2\times2$ max-pool, stride 2. Layer 3: $3\times3$ conv, $16\to32$, "same", ReLU. Layer 4: $2\times2$ max-pool, stride 2. Layer 5: fully connected to 10 outputs (with offsets).`,
     parts:[
      {q:R`Give the output shape after each layer.`,
       a:R`L1: $32\times32\times16$; L2: $16\times16\times16$; L3: $16\times16\times32$; L4: $8\times8\times32$; L5: $10$.`},
      {q:R`Count the parameters per layer and the total.`,
       a:R`L1: $9\cdot3\cdot16+16=432+16=448$. L2: 0. L3: $9\cdot16\cdot32+32=4608+32=4640$. L4: 0. L5: $(8\cdot8\cdot32)\cdot10+10=20480+10=20490$. Total $448+4640+20490=25578$.`},
      {q:R`Which layer dominates, and how could you reduce it?`,
       a:R`The fully connected head (80% of the parameters). Replace it with global average pooling followed by a $32\to10$ linear layer ($330$ parameters), or add another pooling stage before it.`},
      {q:R`If the two convolutions used valid boundaries instead, what would the final feature map size be (assume floor for pooling)?`,
       a:R`L1: $30\times30$; pool: $15\times15$; L3: $13\times13$; pool: $6\times6$ (floor of 6.5). The FC layer would then have $6\cdot6\cdot32\cdot10+10=11530$ parameters.`}
     ]}
  ]
 },
 {
  id:"denoise", name:"Denoisers, residual learning, and images as random vectors", prob:30, trend:"stable",
  years:["2024 P2","2024 P4"],
  evidence: R`Two problems in 2024: (i) an image as a point in $\mathbb R^{N^2}$: a dense $N^2\times N^2$ matrix for a 1-megapixel image needs $2^{42}$ bytes (4 TB); marginal vs. conditional pixel densities (the conditional given neighbors is narrow); (ii) training a denoiser on $Y=X+W$: $E[W_iW_j]=\sigma^2\delta(i-j)$, choose typical images, predict the noise (residual learning) with loss $\|W_k-f_\theta(Y_k)\|^2$ because noise has small dynamic range and the skip connection eases training.`,
  concepts:[
   R`An $N\times N$ image is a vector in $\mathbb R^{N^2}$; a linear operator on it is an $N^2\times N^2$ matrix: for $N=1024$ and 4-byte floats, $2^{40}\cdot4=2^{42}$ bytes $\approx4$ TB, so linear image operators are never stored densely (convolution, FFT, sparse structure instead).`,
   R`Marginal $p_i(x_i)=\int p(x)\prod_{j\ne i}dx_j$ is broad (a pixel can be anything); conditional $p(x_i|x_{j\ne i})=p(x)/\int p(x)dx_i$ is narrow (a pixel is close to its neighbors). A narrow plotted density is the conditional.`,
   R`Denoiser training: $Y_k=X_k+W_k$, $W_k\sim N(0,\sigma^2I)$, $E[W_{k,i}W_{k,j}]=\sigma^2\delta(i-j)$ (white). Choose $X_k$ typical of the target images so the network learns the image prior. Residual learning: train $f_\theta(Y)\approx W$ with $L=\tfrac1K\sum_k\|W_k-f_\theta(Y_k)\|^2$ and output $\hat X=Y-f_\theta(Y)$: the noise has smaller dynamic range and the identity skip connection mitigates vanishing gradients.`,
   R`The MMSE denoiser is $E[X|Y]$; trained denoisers approximate it and can be plugged into iterative reconstruction (plug-and-play).`
  ],
  problems:[
   { title:"Residual denoiser and pixel distributions", points:25,
     intro: R`Let $X\in[0,1]^{N^2}$ be an $N\times N$ image with density $p(x)$, and training pairs $Y_k=X_k+W_k$ with $W_k\sim N(0,\sigma^2I)$.`,
     parts:[
      {q:R`For $N=2048$ and single-precision floats, how much memory would a dense matrix $A\in\mathbb R^{N^2\times N^2}$ need?`,
       a:R`$N^2=2^{22}$ pixels; $A$ has $2^{44}$ entries at $2^2$ bytes: $2^{46}$ bytes $=64$ TB. Hence image operators must be implicit (convolutions, FFTs).`},
      {q:R`Write the marginal density of pixel $i$ and the conditional density of pixel $i$ given all others. A plotted density is very narrow around a value near 0.4: which of the two is it likely to be, and why?`,
       a:R`$p_i(x_i)=\int p(x)\prod_{j\ne i}dx_j$; $p(x_i|x_{j\ne i})=\dfrac{p(x)}{\int p(x)dx_i}$. The narrow one is the conditional: given its neighbors, a pixel is nearly determined; the marginal spreads over $[0,1]$.`},
      {q:R`Compute $E[W_{k,i}W_{k,j}]$ and state what it says about the noise.`,
       a:R`$\sigma^2\delta(i-j)$: the noise is white (uncorrelated across pixels) with equal variance everywhere.`},
      {q:R`How should the clean images $X_k$ be chosen, and what is the best target for a network $f_\theta(Y)$: the image or the noise? Write the loss.`,
       a:R`Use images typical of the application so the network learns the relevant prior. Train it to predict the noise (residual learning): $L(\theta)=\tfrac1K\sum_k\|W_k-f_\theta(Y_k)\|^2$, then $\hat X=Y-f_\theta(Y)$.`},
      {q:R`Give two reasons residual learning trains better.`,
       a:R`The noise has a much smaller dynamic range than the image, so the regression target is easier; and $\hat X=Y-f_\theta(Y)$ is a skip connection, which passes gradients directly and mitigates the vanishing-gradient problem.`}
     ]}
  ]
 }
 ]
};
})();
