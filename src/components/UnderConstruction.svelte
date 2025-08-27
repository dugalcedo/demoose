<div class="under-construction">under<br> construction</div>


<style>
    .under-construction {
        z-index: 500;
        position: fixed;
        top: 1rem;
        left: 1rem;
        background-color: var(--hl);
        color: black;
        text-align: center;
        font-size: .8rem;
        padding: .5rem;
        border-radius: .5rem;
        transform: scale(1);
        animation: wobble linear infinite 1s;
    }

    @keyframes wobble {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
        }
    }
</style>