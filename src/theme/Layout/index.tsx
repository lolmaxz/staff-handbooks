import type { WrapperProps } from "@docusaurus/types";
import Layout from "@theme-original/Layout";
import type LayoutType from "@theme/Layout";

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): JSX.Element {
  return <Layout {...props} />;
}
