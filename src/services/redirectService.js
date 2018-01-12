class RedirectService {

    goTo(path) {
        window.location.assign(`#${path}`);
    }

    reload() {
        window.location.reload();
    }
};

export const redirectService = new RedirectService();