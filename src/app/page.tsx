import { SidebarList } from "@/components/layout/sidebar/sidebar-list";
import styles from "./page.module.css";
import { ColorModeButton } from "@/components/ui/color-mode";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}></main>
      <footer className={styles.footer}></footer>
      <ColorModeButton />
      <SidebarList />
    </div>
  );
}
