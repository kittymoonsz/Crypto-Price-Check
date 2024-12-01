#[cfg(any(
    target_os = "linux", 
    target_os = "freebsd", 
    target_os = "dragonfly", 
    target_os = "openbsd", 
    target_os = "netbsd" ))] 

fn main() {
    std::env::set_var("WEBKIT_DISABLE_COMPOSITING_MODE", "1");
    tauri_app_lib::run()
}
 
