<script>
    import { readable, derived } from 'svelte/store';

    export const time = readable(new Date(), function start(set) {
        const interval = setInterval(() => {
            set(new Date());
        }, 1000);

        return function stop() {
            clearInterval(interval);
        };
    });

    const start = new Date();

    export const elapsed = derived(
            time,
            $time => Math.round(($time - start) / 1000)
    );

    const formatter = new Intl.DateTimeFormat('en', {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit'
    });
</script>

<h1>The time is {formatter.format($time)}</h1>

<p>
    This page has been open for
    {$elapsed} {$elapsed === 1 ? 'second' : 'seconds'}
</p>
