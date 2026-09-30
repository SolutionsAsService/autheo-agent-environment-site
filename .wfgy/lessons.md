## 2026-09-29 -- Browser interactions validate semantic controls
Goal (G): Publish a functional, deployable explanatory website.
What drifted / what went wrong: Initial authored option markup closed a tag where another option should open; static policy tests passed but the real browser could not select the missing operations.
Fix / resolution: Corrected the markup and retained desktop/mobile scope-selection tests. Browser dependencies were loaded from the existing isolated library directory, without changing system configuration.
Generalizes to: Exercise actual rendered controls, not just the backing policy function; distinguish test-runtime setup failures from product failures.
